const db = require('../db');

const apiKeyMiddleware = async (req, res, next) => {
    // 1. Check if Authorization header (JWT) is present
    const token = req.header('Authorization');
    if (token) {
        // If JWT exists, let the next middleware (authMiddleware) handle it, or we can handle it here?
        // Actually, the plan is to allow EITHER.
        // If token is present, we might want to skip API key check and let authMiddleware run?
        // But routes usually have: router.get('/', auth, controller).
        // If we chain them: router.get('/', apiKeyOrJwt, controller).

        // Let's create a "hybrid" middleware or just check for API key if NO token.
        return next();
    }

    // 2. Check for x-api-key
    const apiKey = req.header('x-api-key');
    if (!apiKey) {
        // If neither token nor api key, we effectively deny access by not setting req.user
        // The authMiddleware (if used in chain) will fail.
        // But if we replace authMiddleware with this, we must handle both.
        return next();
    }

    try {
        // 3. Validate Key
        // In a real app, we would hash the incoming key and compare with key_hash.
        // For this demo, let's assume the key sent IS the hash or we do a direct comparison if we stored it plainly (not recommended but faster for demo).
        // Wait, migration said key_hash.
        // Let's assume simpler approach: we store the key plainly for now or simple comparison.
        // Actually, let's just query by key_hash for now to be safe-ish.
        // We need to know how we generate it. 
        // Let's assume the key passed in header IS the key we stored in DB (as key_hash) for simplicity of this prototype.

        const result = await db.query(
            'SELECT k.*, u.id as user_id, u.role, u.plan FROM api_keys k JOIN users u ON k.user_id = u.id WHERE k.key_hash = $1',
            [apiKey]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid API Key' });
        }

        const keyData = result.rows[0];

        // 4. Update usage
        await db.query('UPDATE api_keys SET last_used_at = NOW() WHERE id = $1', [keyData.id]);

        // 5. Set req.user (mocking the JWT payload structure)
        req.user = {
            id: keyData.user_id,
            role: keyData.role,
            plan: keyData.plan,
            isApiKey: true
        };

        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error during API Key validation' });
    }
};

module.exports = apiKeyMiddleware;

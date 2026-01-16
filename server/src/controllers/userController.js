const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if user exists
        const userExists = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = await db.query(
            'INSERT INTO users (name, email, password_hash, role, plan) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role, plan',
            [name, email, hashedPassword, role || 'owner', 'free']
        );

        // Generate Token
        const user = newUser.rows[0];
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.status(201).json({ ...user, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check user
        const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userResult.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const user = userResult.rows[0];

        // Check password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate Token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            plan: user.plan,
            cnpj: user.cnpj,
            logo_url: user.logo_url,
            phone: user.phone,
            address: user.address,
            token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateProfile = async (req, res) => {
    const userId = req.user.id;
    const { name, cnpj, logo_url, phone, address } = req.body;

    try {
        const updatedUser = await db.query(
            `UPDATE users 
             SET name = COALESCE($1, name), 
                 cnpj = COALESCE($2, cnpj), 
                 logo_url = COALESCE($3, logo_url), 
                 phone = COALESCE($4, phone), 
                 address = COALESCE($5, address) 
             WHERE id = $6 
             RETURNING id, name, email, role, plan, cnpj, logo_url, phone, address`,
            [name, cnpj, logo_url, phone, address, userId]
        );

        res.json(updatedUser.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error updating profile' });
    }
};

exports.getUsers = async (req, res) => {
    try {
        // Only return non-sensitive info
        const users = await db.query('SELECT id, name, email, role FROM users');
        res.json(users.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.generateApiKey = async (req, res) => {
    try {
        const userId = req.user.id;
        // Generate a random key
        const apiKey = 'sk_live_' + require('crypto').randomBytes(24).toString('hex');

        // 1. Invalidate old keys
        await db.query('DELETE FROM api_keys WHERE user_id = $1', [userId]);

        // 2. Save new key
        await db.query(
            'INSERT INTO api_keys (user_id, key_hash, name) VALUES ($1, $2, $3)',
            [userId, apiKey, 'Default Key']
        );

        res.json({ apiKey });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error generating key' });
    }
};

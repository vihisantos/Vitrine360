const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // 0. If req.user is already set (by apiKeyMiddleware), skip token check
    if (req.user) {
        return next();
    }

    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id: 1 }
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token is not valid' });
    }
};

module.exports = authMiddleware;

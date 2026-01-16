const db = require('../db');

exports.createProduct = async (req, res) => {
    const { name, category, stock, price, min_stock, image_url } = req.body;
    const user_id = req.user.id; // From Auth Middleware

    try {
        const newProduct = await db.query(
            'INSERT INTO products (user_id, name, category, stock, price, min_stock, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [user_id, name, category, stock, price, min_stock, image_url]
        );
        res.status(201).json(newProduct.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getProducts = async (req, res) => {
    const user_id = req.user.id; // From Auth Middleware
    try {
        const products = await db.query('SELECT * FROM products WHERE user_id = $1', [user_id]);
        res.json(products.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, category, stock, price, min_stock, image_url } = req.body;
    const user_id = req.user.id;

    try {
        // Ensure product belongs to user
        const checkProduct = await db.query('SELECT * FROM products WHERE id = $1 AND user_id = $2', [id, user_id]);
        if (checkProduct.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found or unauthorized' });
        }

        const updatedProduct = await db.query(
            'UPDATE products SET name = $1, category = $2, stock = $3, price = $4, min_stock = $5, image_url = $6 WHERE id = $7 RETURNING *',
            [name, category, stock, price, min_stock, image_url, id]
        );
        res.json(updatedProduct.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    const user_id = req.user.id;

    try {
        const result = await db.query('DELETE FROM products WHERE id = $1 AND user_id = $2 RETURNING *', [id, user_id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found or unauthorized' });
        }

        res.json({ message: 'Product deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const db = require('../db');

exports.createSale = async (req, res) => {
    const { product_id, quantity, total_price } = req.body;
    const user_id = req.user.id;

    try {
        // Start transaction
        await db.query('BEGIN');

        // Verify product ownership
        const productCheck = await db.query('SELECT stock FROM products WHERE id = $1 AND user_id = $2', [product_id, user_id]);
        if (productCheck.rows.length === 0) {
            await db.query('ROLLBACK');
            return res.status(404).json({ error: 'Product not found or unauthorized' });
        }

        if (productCheck.rows[0].stock < quantity) {
            await db.query('ROLLBACK');
            return res.status(400).json({ error: 'Insufficient stock' });
        }

        // Record sale
        const newSale = await db.query(
            'INSERT INTO sales (user_id, product_id, quantity, total_price) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_id, product_id, quantity, total_price]
        );

        // Update stock
        await db.query(
            'UPDATE products SET stock = stock - $1 WHERE id = $2',
            [quantity, product_id]
        );

        // Record income in finances
        await db.query(
            "INSERT INTO finances (user_id, type, description, amount) VALUES ($1, 'income', 'Venda de produto', $2)",
            [user_id, total_price]
        );

        await db.query('COMMIT');
        res.status(201).json(newSale.rows[0]);
    } catch (err) {
        await db.query('ROLLBACK');
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getSales = async (req, res) => {
    const user_id = req.user.id;
    try {
        const sales = await db.query(`
      SELECT s.*, p.name as product_name 
      FROM sales s 
      JOIN products p ON s.product_id = p.id 
      WHERE s.user_id = $1 
      ORDER BY s.sale_date DESC`,
            [user_id]
        );
        res.json(sales.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const db = require('../db');

exports.createFinanceRecord = async (req, res) => {
    const { type, description, amount, date } = req.body;
    const user_id = req.user.id;

    try {
        const newRecord = await db.query(
            'INSERT INTO finances (user_id, type, description, amount, date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [user_id, type, description, amount, date]
        );
        res.status(201).json(newRecord.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getFinances = async (req, res) => {
    const user_id = req.user.id;
    try {
        const finances = await db.query(
            'SELECT * FROM finances WHERE user_id = $1 ORDER BY date DESC',
            [user_id]
        );
        res.json(finances.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getFinanceSummary = async (req, res) => {
    const user_id = req.user.id;
    try {
        const income = await db.query(
            "SELECT SUM(amount) FROM finances WHERE user_id = $1 AND type = 'income'",
            [user_id]
        );
        const expense = await db.query(
            "SELECT SUM(amount) FROM finances WHERE user_id = $1 AND type = 'expense'",
            [user_id]
        );

        res.json({
            income: Number(income.rows[0].sum) || 0,
            expense: Number(expense.rows[0].sum) || 0,
            balance: (Number(income.rows[0].sum) || 0) - (Number(expense.rows[0].sum) || 0)
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

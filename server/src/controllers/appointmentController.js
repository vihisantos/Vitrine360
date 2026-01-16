const db = require('../db');

exports.createAppointment = async (req, res) => {
    const { client_name, service, date_time, staff } = req.body;
    const user_id = req.user.id;

    try {
        const newAppointment = await db.query(
            'INSERT INTO appointments (user_id, client_name, service, date_time, staff) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [user_id, client_name, service, date_time, staff]
        );
        res.status(201).json(newAppointment.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getAppointments = async (req, res) => {
    const user_id = req.user.id;
    try {
        const appointments = await db.query(
            'SELECT * FROM appointments WHERE user_id = $1 ORDER BY date_time ASC',
            [user_id]
        );
        res.json(appointments.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateAppointmentStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const user_id = req.user.id;

    try {
        const result = await db.query(
            'UPDATE appointments SET status = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
            [status, id, user_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Appointment not found or unauthorized' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

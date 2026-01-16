const db = require('../db');

exports.inviteMember = async (req, res) => {
    const userId = req.user.id; // Owner
    const { email } = req.body;

    try {
        // 1. Check if user is Enterprise
        if (req.user.plan !== 'enterprise') {
            return res.status(403).json({ error: 'Funcionalidade exclusiva para plano Empresarial' });
        }

        // 2. Check current team count
        const teamCount = await db.query('SELECT COUNT(*) FROM team_members WHERE owner_id = $1', [userId]);
        if (parseInt(teamCount.rows[0].count) >= 3) {
            return res.status(400).json({ error: 'Limite de 3 membros atingido' });
        }

        // 3. Add to team_members
        // We do NOT create a user account yet, just an invite. 
        // Logic: if email exists in users, maybe link? For now just store invite.

        await db.query(
            'INSERT INTO team_members (owner_id, member_email, status) VALUES ($1, $2, $3)',
            [userId, email, 'pending']
        );

        res.status(201).json({ message: 'Convite enviado com sucesso' });

    } catch (err) {
        if (err.code === '23505') { // Unique violation
            return res.status(400).json({ error: 'Este email já foi convidado' });
        }
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getTeam = async (req, res) => {
    const userId = req.user.id;
    try {
        const team = await db.query('SELECT * FROM team_members WHERE owner_id = $1', [userId]);
        res.json(team.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.removeMember = async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;

    try {
        const result = await db.query('DELETE FROM team_members WHERE id = $1 AND owner_id = $2 RETURNING *', [id, userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Membro não encontrado' });
        }
        res.json({ message: 'Membro removido com sucesso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

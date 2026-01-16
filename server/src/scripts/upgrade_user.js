const { Pool } = require('pg');
const path = require('path');

// Hardcoded connection string as fallback
const connectionString = 'postgresql://postgres:631330%40Akat@db.jvyhmylmrlzeolgzytwr.supabase.co:5432/postgres';

const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
});

const upgradeUser = async () => {
    const email = 'melanciaqueen@gmail.com';
    const newPlan = 'pro';

    try {
        console.log(`Searching for user: ${email}...`);

        const res = await pool.query(
            'UPDATE users SET plan = $1 WHERE email = $2 RETURNING id, name, email, plan',
            [newPlan, email]
        );

        if (res.rows.length === 0) {
            console.log('❌ User not found!');
        } else {
            console.log(`✅ User ${res.rows[0].name} upgraded to ${res.rows[0].plan} successfully!`);
        }
    } catch (error) {
        console.error('❌ Upgrade failed:', error);
    } finally {
        await pool.end();
    }
};

upgradeUser();

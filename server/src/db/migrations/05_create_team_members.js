const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://postgres:631330%40Akat@db.jvyhmylmrlzeolgzytwr.supabase.co:5432/postgres',
    ssl: { rejectUnauthorized: false }
});

const migrate = async () => {
    try {
        console.log('Running Team Members migration...');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS team_members (
                id SERIAL PRIMARY KEY,
                owner_id INT REFERENCES users(id),
                member_email VARCHAR(255) NOT NULL,
                status VARCHAR(20) DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT NOW(),
                UNIQUE(owner_id, member_email)
            );
        `);

        console.log('✅ Team Members table created successfully.');
    } catch (error) {
        console.error('❌ Migration failed:', error);
    } finally {
        await pool.end();
    }
};

migrate();

const { Pool } = require('pg');
const path = require('path');
const pool = new Pool({
    connectionString: 'postgresql://postgres:631330%40Akat@db.jvyhmylmrlzeolgzytwr.supabase.co:5432/postgres',
    ssl: { rejectUnauthorized: false }
});

const migrate = async () => {
    try {
        console.log('Running API Keys migration...');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS api_keys (
                id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(id),
                key_hash VARCHAR(255) NOT NULL,
                name VARCHAR(100),
                created_at TIMESTAMP DEFAULT NOW(),
                last_used_at TIMESTAMP
            );
        `);

        console.log('✅ API Keys table created successfully.');
    } catch (error) {
        console.error('❌ Migration failed:', error);
    } finally {
        await pool.end();
    }
};

migrate();

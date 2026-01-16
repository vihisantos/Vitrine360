require('dotenv').config({ path: '../../.env' });
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://postgres:631330%40Akat@db.jvyhmylmrlzeolgzytwr.supabase.co:5432/postgres',
    ssl: { rejectUnauthorized: false }
});

async function migrate() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        await client.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS cnpj VARCHAR(20),
      ADD COLUMN IF NOT EXISTS logo_url VARCHAR(255),
      ADD COLUMN IF NOT EXISTS phone VARCHAR(20),
      ADD COLUMN IF NOT EXISTS address TEXT;
    `);

        await client.query('COMMIT');
        console.log('Migration 04_add_business_info completed successfully');
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Migration failed:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

migrate();

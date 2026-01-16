const { Pool } = require('pg');
const path = require('path');

// Hardcoded connection string as fallback due to previous env issues in migration context
const connectionString = 'postgresql://postgres:631330%40Akat@db.jvyhmylmrlzeolgzytwr.supabase.co:5432/postgres';

const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
});

const migrate = async () => {
    try {
        console.log('Running Product Image migration...');

        await pool.query(`
            ALTER TABLE products 
            ADD COLUMN IF NOT EXISTS image_url TEXT;
        `);

        console.log('✅ Added image_url column to products table.');
    } catch (error) {
        console.error('❌ Migration failed:', error);
    } finally {
        await pool.end();
    }
};

migrate();

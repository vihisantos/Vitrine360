const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Required for Supabase
});

async function initDb() {
    try {
        console.log('Validating connection to Supabase...');
        console.log('URL:', process.env.DATABASE_URL.replace(/:([^:@]+)@/, ':****@')); // Log masked URL

        const schemaPath = path.join(__dirname, '../../../database/schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        console.log('Running schema.sql...');
        await pool.query(schema);

        console.log('✅ Database initialized successfully on Supabase!');
    } catch (err) {
        console.error('❌ Error initializing database:', err);
    } finally {
        await pool.end();
    }
}

initDb();

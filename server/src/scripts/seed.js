const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const seed = async () => {
    try {
        console.log('🌱 Starting seed...');

        // 1. Create or Get Demo User
        const email = 'demo@vitrine360.com';
        const password = 'password123';
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Check if user exists
        let userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        let userId;

        if (userResult.rows.length === 0) {
            console.log('Creating demo user...');
            const newUser = await pool.query(
                'INSERT INTO users (name, email, password_hash, role, plan) VALUES ($1, $2, $3, $4, $5) RETURNING id',
                ['Demo User', email, hashedPassword, 'owner', 'pro']
            );
            userId = newUser.rows[0].id;
        } else {
            console.log('Demo user exists, using existing user.');
            userId = userResult.rows[0].id;
        }

        // 2. Clear existing data for this user (to keep it clean)
        await pool.query('DELETE FROM sales WHERE user_id = $1', [userId]);
        await pool.query('DELETE FROM appointments WHERE user_id = $1', [userId]);
        await pool.query('DELETE FROM products WHERE user_id = $1', [userId]);
        await pool.query('DELETE FROM finances WHERE user_id = $1', [userId]);

        console.log('Cleared existing data for user.');

        // 3. Products
        console.log('Seeding products...');
        const products = [
            { name: 'Perfume Floral', category: 'Beleza', price: 150.00, stock: 20, min_stock: 5 },
            { name: 'Batom Vermelho Matte', category: 'Maquiagem', price: 45.00, stock: 50, min_stock: 10 },
            { name: 'Hidratante Facial', category: 'Skincare', price: 89.90, stock: 15, min_stock: 5 },
            { name: 'Kit Pincéis', category: 'Acessórios', price: 120.00, stock: 8, min_stock: 3 },
            { name: 'Shampoo Profissional', category: 'Cabelo', price: 75.00, stock: 30, min_stock: 8 },
            { name: 'Relógio Smart', category: 'Eletrônicos', price: 250.00, stock: 5, min_stock: 2 },
        ];

        let productIds = [];
        for (const p of products) {
            const res = await pool.query(
                'INSERT INTO products (user_id, name, category, price, stock, min_stock) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, price',
                [userId, p.name, p.category, p.price, p.stock, p.min_stock]
            );
            productIds.push({ id: res.rows[0].id, price: res.rows[0].price });
        }

        // 4. Sales (Last 30 days)
        console.log('Seeding sales...');
        const today = new Date();
        for (let i = 0; i < 30; i++) { // 30 random sales
            const product = productIds[Math.floor(Math.random() * productIds.length)];
            const quantity = Math.floor(Math.random() * 3) + 1; // 1 to 3 items
            const totalPrice = Number(product.price) * quantity;

            // Random date in last 30 days
            const saleDate = new Date();
            saleDate.setDate(today.getDate() - Math.floor(Math.random() * 30));

            await pool.query(
                'INSERT INTO sales (user_id, product_id, quantity, total_price, sale_date) VALUES ($1, $2, $3, $4, $5)',
                [userId, product.id, quantity, totalPrice, saleDate]
            );
        }

        // 5. Appointments
        console.log('Seeding appointments...');
        const services = ['Limpeza de Pele', 'Maquiagem Festa', 'Design de Sobrancelhas', 'Massagem'];
        const statuses = ['confirmed', 'scheduled', 'completed', 'cancelled'];

        for (let i = 0; i < 15; i++) {
            const service = services[Math.floor(Math.random() * services.length)];
            const status = statuses[Math.floor(Math.random() * statuses.length)];

            // Date: -5 days to +10 days
            const aptDate = new Date();
            aptDate.setDate(today.getDate() + (Math.floor(Math.random() * 15) - 5));
            aptDate.setHours(9 + Math.floor(Math.random() * 8), 0, 0); // 9am to 5pm

            await pool.query(
                'INSERT INTO appointments (user_id, client_name, service, date_time, staff, status) VALUES ($1, $2, $3, $4, $5, $6)',
                [userId, `Cliente ${i + 1}`, service, aptDate, 'Ana Silva', status]
            );
        }

        console.log('✅ Seed completed successfully!');
        console.log(`Log in with: demo@vitrine360.com / password123`);

    } catch (error) {
        console.error('❌ Seed failed:', error);
    } finally {
        await pool.end();
    }
};

seed();

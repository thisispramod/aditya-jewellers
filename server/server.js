const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const cloudinaryStorage = require('./cloudinaryStorage');
const axios = require('axios');
const cron = require('node-cron');

const upload = multer({ storage: cloudinaryStorage });

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection Pool
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'aditya_jew',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test database connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Database connected successfully');
        connection.release();
    }
});

// ==================== PRICING SYSTEM ====================

// Initialize pricing table and first row
const initPricingTable = () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS pricing_config (
            id INT PRIMARY KEY DEFAULT 1,
            mode ENUM('LIVE', 'MANUAL') DEFAULT 'LIVE',
            manual_gold_24k DECIMAL(10, 2) DEFAULT 0.00,
            manual_gold_22k DECIMAL(10, 2) DEFAULT 0.00,
            manual_silver DECIMAL(10, 2) DEFAULT 0.00,
            live_gold_24k DECIMAL(10, 2) DEFAULT 0.00,
            live_gold_22k DECIMAL(10, 2) DEFAULT 0.00,
            live_silver DECIMAL(10, 2) DEFAULT 0.00,
            last_api_sync TIMESTAMP NULL,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            CONSTRAINT single_row CHECK (id = 1)
        )
    `;

    db.query(createTableQuery, (err) => {
        if (err) console.error('Error creating pricing_config table:', err);
        else {
            db.query('INSERT IGNORE INTO pricing_config (id, mode) VALUES (1, "LIVE")', (err) => {
                if (err) console.error('Error inserting initial pricing config:', err);
                else console.log(' Pricing config initialized');
            });
        }
    });
};

initPricingTable();

// Function to fetch live rates from GoldAPI.io
const fetchLiveRates = async () => {
    const GOLDAPI_KEY = process.env.FREE_GOLD_API_KEY;
    if (!GOLDAPI_KEY) {
        console.warn(' GOLDAPI_KEY missing in .env. Skipping live rate update.');
        return;
    }

    try {
        console.log('Fetching live rates...');
        // GoldAPI returns price per gram if symbol is XAU (Gold) and XAG (Silver)
        // Note: GoldAPI.io sometimes returns price per ounce. Let's check their /price endpoint.
        const goldRes = await axios.get('https://www.goldapi.io/api/XAU/INR', {
            headers: { 'x-access-token': GOLDAPI_KEY }
        });

        const silverRes = await axios.get('https://www.goldapi.io/api/XAG/INR', {
            headers: { 'x-access-token': GOLDAPI_KEY }
        });

        const gold24k = goldRes.data.price_gram_24k || (goldRes.data.price / 31.1035);
        const gold22k = goldRes.data.price_gram_22k || (gold24k * 0.9167);
        const silver = silverRes.data.price_gram || (silverRes.data.price / 31.1035);

        db.query(
            `UPDATE pricing_config SET 
            live_gold_24k = ?, 
            live_gold_22k = ?, 
            live_silver = ?, 
            last_api_sync = CURRENT_TIMESTAMP 
            WHERE id = 1`,
            [gold24k, gold22k, silver],
            (err) => {
                if (err) console.error('Error saving live rates:', err);
                else console.log(' Live rates updated successfully');
            }
        );
    } catch (error) {
        console.error(' Error fetching from GoldAPI:', error.message);
    }
};

cron.schedule('*/10 * * * *', () => {
    db.query('SELECT mode FROM pricing_config WHERE id = 1', (err, results) => {
        if (!err && results.length > 0 && results[0].mode === 'LIVE') {
            fetchLiveRates();
        }
    });
});

setTimeout(() => {
    db.query('SELECT mode FROM pricing_config WHERE id = 1', (err, results) => {
        if (!err && results.length > 0 && results[0].mode === 'LIVE') {
            fetchLiveRates();
        }
    });
}, 5000);

// ==================== AUTHENTICATION ENDPOINTS ====================

// Admin Login
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;

    console.log('Login attempt:', { username, password });

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
    }

    db.query(
        'SELECT * FROM admin_users WHERE username = ? AND password = ?',
        [username, password],
        (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error' });
            }

            console.log('Query results:', results);

            if (results.length > 0) {
                console.log('Login successful for user:', username);
                res.json({
                    success: true,
                    user: {
                        id: results[0].id,
                        username: results[0].username
                    }
                });
            } else {
                console.log('Login failed: Invalid credentials');
                res.status(401).json({ success: false, error: 'Invalid credentials' });
            }
        }
    );
});

// ==================== PRODUCT ENDPOINTS ====================

// Get All Products
app.get('/api/products', (req, res) => {
    const { category } = req.query;
    let query = 'SELECT * FROM products';
    const params = [];

    if (category && category !== 'All') {
        query += ' WHERE category = ?';
        params.push(category);
    }

    query += ' ORDER BY created_at DESC';

    db.query(query, params, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        // Convert is_new from 0/1 to boolean
        const products = results.map(p => ({
            ...p,
            isNew: Boolean(p.is_new),
            originalPrice: p.original_price
        }));

        res.json(products);
    });
});

// Get Single Product
app.get('/api/products/:id', (req, res) => {
    db.query('SELECT * FROM products WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (results.length === 0) return res.status(404).json({ error: 'Product not found' });

        const product = {
            ...results[0],
            isNew: Boolean(results[0].is_new),
            originalPrice: results[0].original_price
        };

        res.json(product);
    });
});

// Add New Product (Admin only)
app.post('/api/products', upload.single('imageFile'), (req, res) => {
    const { name, category, price, originalPrice, isNew } = req.body;
 
    let imageUrl = null;

    if (req.file) {
        imageUrl = req.file.path; // Cloudinary URL
    }

    if (!imageUrl && req.body.image) {
        imageUrl = req.body.image; // URL mode
    }
    
    if (!name || !category || !price || !imageUrl) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    db.query(
        `INSERT INTO products 
        (name, category, price, original_price, image, is_new) 
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            name,
            category,
            price,
            originalPrice || null,
            imageUrl,
            isNew === 'true' || isNew === true ? 1 : 0
        ],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Database error' });
            }

            res.status(201).json({
                message: 'Product added successfully',
                product: {
                    id: result.insertId,
                    name,
                    category,
                    price,
                    originalPrice,
                    image: imageUrl,
                    isNew: isNew === 'true' || isNew === true
                }
            });
        }
    );
}); 

// ==================== RATE ENDPOINTS ====================

app.get('/api/rates', (req, res) => {
    db.query('SELECT * FROM pricing_config WHERE id = 1', (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (results.length === 0) return res.status(404).json({ error: 'Settings not found' });
        const config = results[0];
        const isLive = config.mode === 'LIVE';
        res.json({
            mode: config.mode,
            gold24k: isLive ? config.live_gold_24k : config.manual_gold_24k,
            gold22k: isLive ? config.live_gold_22k : config.manual_gold_22k,
            silver: isLive ? config.live_silver : config.manual_silver,
            lastUpdate: isLive ? config.last_api_sync : config.updated_at
        });
    });
});

app.get('/api/rates/admin', (req, res) => {
    db.query('SELECT * FROM pricing_config WHERE id = 1', (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results[0]);
    });
});

app.post('/api/rates/admin/mode', (req, res) => {
    const { mode } = req.body;
    if (!['LIVE', 'MANUAL'].includes(mode)) return res.status(400).json({ error: 'Invalid mode' });
    db.query('UPDATE pricing_config SET mode = ? WHERE id = 1', [mode], (err) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (mode === 'LIVE') fetchLiveRates();
        res.json({ success: true, message: `Mode switched to ${mode}` });
    });
});

app.post('/api/rates/admin/manual', (req, res) => {
    const { gold24k, gold22k, silver } = req.body;
    db.query(
        'UPDATE pricing_config SET manual_gold_24k = ?, manual_gold_22k = ?, manual_silver = ? WHERE id = 1',
        [gold24k, gold22k, silver],
        (err) => {
            if (err) return res.status(500).json({ error: 'Database error' });
            res.json({ success: true, message: 'Manual rates updated' });
        }
    );
});

// ==================== INQUIRY ENDPOINTS ====================

// Submit Inquiry
app.post('/api/inquire', (req, res) => {
    const { product_id, name, phone, message } = req.body;
    db.query(
        'INSERT INTO inquiries (product_id, customer_name, customer_phone, message) VALUES (?, ?, ?, ?)',
        [product_id, name, phone, message],
        (err, result) => {
            if (err) return res.status(500).json({ error: 'Database error' });
            res.status(201).json({ message: 'Inquiry received', id: result.insertId });
        }
    );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`https://aditya-jewellers-delta.vercel.app`);
});

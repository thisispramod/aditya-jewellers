const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const path = require('path');
const fs = require('fs');


// Ensure uploads folder exists
const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors());
app.use(express.json());

// Serve static files from uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

    // Validate required fields
    if (!name || !category || !price) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Image must come from file upload
    if (!req.file) {
        return res.status(400).json({ error: 'Image file is required' });
    }

    // FULL image URL (works locally & on server)
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

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
                console.error('DB ERROR:', err);
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


// ==================== LIVE RATES ENDPOINT ====================

// Get Live Gold Rates (Mock)
app.get('/api/rates', (req, res) => {
    // In real scenario, fetch from a gold rate API provider
    res.json({
        gold24k: 7250 + Math.random() * 10,
        gold22k: 6650 + Math.random() * 10,
        silver: 88.50 + Math.random()
    });
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

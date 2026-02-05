CREATE DATABASE IF NOT EXISTS aditya_jew;
USE aditya_jew;

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table (Simplified)
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    image VARCHAR(500),
    is_new BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inquiries Table
CREATE TABLE IF NOT EXISTS inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    customer_name VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    message TEXT,
    is_resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insert Default Admin User (password: admin@123)
-- Note: In production, use bcrypt to hash passwords
INSERT INTO admin_users (username, password) VALUES 
('admin', 'admin@123');

-- Sample Products Data
INSERT INTO products (name, category, price, original_price, image, is_new) VALUES
('Floral Gold Necklace', 'Necklaces', 45000.00, NULL, 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=2070&auto=format&fit=crop', TRUE),
('Diamond Stud Earrings', 'Earrings', 12500.00, 15000.00, 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2070&auto=format&fit=crop', TRUE),
('Traditional Gold Bangle', 'Bangles', 85000.00, NULL, 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop', TRUE),
('Silver Anklets Pair', 'Silver', 3200.00, NULL, 'https://images.unsplash.com/photo-1633934542430-0905ccb5f050?q=80&w=2025&auto=format&fit=crop', FALSE),
('Gold Ring', 'Rings', 22000.00, NULL, 'https://images.unsplash.com/photo-1605100804763-ebea24b87298?q=80&w=2070&auto=format&fit=crop', FALSE),
('Silver Puja Plate', 'Silver', 5500.00, NULL, 'https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?q=80&w=2070&auto=format&fit=crop', FALSE);

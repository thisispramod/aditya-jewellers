# Database & Backend Setup Guide

## Prerequisites
1. **XAMPP** installed with MySQL running
2. **Node.js** installed

## Step 1: Setup MySQL Database

1. Start XAMPP and ensure **MySQL** is running
2. Open phpMyAdmin: `http://localhost/phpmyadmin`
3. Click on "SQL" tab
4. Copy and paste the entire content from `server/schema.sql`
5. Click "Go" to execute

This will create:
- Database: `aditya_jewellers`
- Tables: `admin_users`, `products`, `inquiries`
- Default admin user: `admin` / `admin@123`
- Sample products

## Step 2: Install Backend Dependencies

Open terminal in the `server` folder:

```bash
cd server
npm install
```

## Step 3: Configure Database Connection

Edit `server/.env` if your MySQL settings are different:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=          # Your MySQL password (empty by default in XAMPP)
DB_NAME=aditya_jewellers
PORT=5000
```

## Step 4: Start the Backend Server

```bash
npm start
```

You should see:
```
✅ Database connected successfully
🚀 Server running on http://localhost:5000
```

## Step 5: Start the Frontend

In a NEW terminal, from the root project folder:

```bash
npm run dev
```

## Testing

1. **Frontend**: http://localhost:5173
2. **Backend API**: http://localhost:5000/api/products
3. **Login**: http://localhost:5173/login
   - Username: `admin`
   - Password: `admin@123`

## API Endpoints

- `POST /api/auth/login` - Admin login
- `GET /api/products` - Get all products
- `POST /api/products` - Add new product (admin only)
- `GET /api/rates` - Get live gold/silver rates
- `POST /api/inquire` - Submit inquiry

## Troubleshooting

**Database Connection Error:**
- Ensure MySQL is running in XAMPP
- Check credentials in `.env`
- Verify database exists in phpMyAdmin

**CORS Error:**
- Backend must be running on port 5000
- Frontend must be on port 5173

**Login Not Working:**
- Check browser console for errors
- Verify backend is running
- Check database has admin_users table with data

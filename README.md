# Aditya Jewellers - Premium SPA

This is a modern, responsive Single Page Application (SPA) for a Gold & Silver Jewellery Shop, built with React, Tailwind CSS, and Framer Motion.

## Features

- **Premium UI**: Gold and silver accented design with smooth animations.
- **Live Rates**: Ticker showing gold and silver prices (simulated).
- **Product Showcase**: Featured collections and new arrivals with hover effects.
- **Mobile Responsive**: Fully adaptive layout with a mobile-friendly menu.
- **Contact Integration**: WhatsApp floating button and inquiry form.

## Project Structure

- `src/components`: Reusable UI components (Navbar, Hero, ProductCard, etc.)
- `src/pages`: Page components (Home, Collections, About, Contact)
- `src/layouts`: Layout wrappers
- `server`: Backend examples (Schema and Express server)

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

3. **Build for Production**:
   ```bash
   npm run build
   ```

## Backend (Optional)

A sample backend structure is provided in the `server` folder.

- `server/schema.sql`: MySQL database schema.
- `server/server.js`: Example Express API server.

To run the backend (requires Node.js and MySQL):
1. Navigate to `server` folder.
2. `npm init -y` and `npm install express mysql2 cors dotenv`.
3. Configure `.env` with DB credentials.
4. Run `node server.js`.

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS 3, Framer Motion, React Router 7.
- **Icons**: Lucide React, React Icons.
- **Backend (Reference)**: Node.js, Express, MySQL.

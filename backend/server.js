const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 9000; // Use environment variable or default to 9000

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

// API routes
app.get('/api/menu', async (req, res) => {
  try {
    const menuItems = await db.getMenuItems();
    res.json(menuItems);
  } catch (error) {
    console.error('Failed to fetch menu items:', error);
    res.status(500).json({ message: 'Failed to retrieve menu items' });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const { customerInfo, cartItems, totalAmount } = req.body;

    // Basic validation
    if (!customerInfo || !cartItems || cartItems.length === 0 || totalAmount === undefined) {
      return res.status(400).json({ message: 'Missing order data.' });
    }
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
        return res.status(400).json({ message: 'Missing customer information.' });
    }

    const orderId = await db.createOrder(customerInfo, cartItems, totalAmount);
    res.status(201).json({ message: 'Order placed successfully!', orderId });
  } catch (error) {
    console.error('Failed to place order:', error);
    res.status(500).json({ message: 'Failed to place order' });
  }
});

// Catch-all handler for client-side routing (serves index.html for any other GET requests)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

// Initialize database and start server
db.initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Serving frontend from:', path.join(__dirname, '..', 'frontend', 'dist'));
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});

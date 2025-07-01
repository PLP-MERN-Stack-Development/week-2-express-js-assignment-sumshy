// server.js - 

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY || "mysecretkey123";

// Middleware
app.use(bodyParser.json());

// Logger middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

// Authentication middleware
app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== API_KEY) {
    return res.status(403).json({ error: 'Forbidden: Invalid API Key' });
  }
  next();
});

// Sample in-memory product database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Product API!');
});

// GET /api/products with filtering and pagination
app.get('/api/products', (req, res) => {
  const { category, page = 1, limit = 10 } = req.query;
  let result = [...products];

  // Filtering
  if (category) {
    result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  // Pagination
  const start = (page - 1) * limit;
  const end = start + parseInt(limit);
  const paginated = result.slice(start, end);

  res.json({
    page: parseInt(page),
    total: result.length,
    data: paginated
  });
});

// Search endpoint
app.get('/api/products/search', (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ error: "Please provide a name to search" });

  const matches = products.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
  res.json(matches);
});

// Product statistics
app.get('/api/products/stats', (req, res) => {
  const stats = {};

  products.forEach(p => {
    const cat = p.category;
    stats[cat] = (stats[cat] || 0) + 1;
  });

  res.json(stats);
});

// CRUD Endpoints
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

app.post('/api/products', (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  if (!name || !description || !price || !category || inStock === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });

  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.category = category || product.category;
  product.inStock = inStock !== undefined ? inStock : product.inStock;

  res.json(product);
});

app.delete('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Product not found" });

  const deleted = products.splice(index, 1)[0];
  res.json(deleted);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Internal Error:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

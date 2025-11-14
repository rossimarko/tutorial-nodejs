/**
 * Module 5 Example 1: Basic Express App
 * Demonstrates: Setting up Express, basic routes
 */

import express from 'express';

const app = express();
const PORT = 3003;

// Basic routes
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Express!</h1>');
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express API!' });
});

// Route with parameters
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ userId: id, name: `User ${id}` });
});

// Query parameters
app.get('/api/search', (req, res) => {
  const { q, limit = 10 } = req.query;
  res.json({ query: q, limit: parseInt(limit) });
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});

/**
 * Module 5 Example 2: Express Middleware
 * Demonstrates: Creating and using middleware
 */

import express from 'express';

const app = express();
const PORT = 3004;

// Built-in middleware
app.use(express.json()); // Parse JSON bodies

// Custom logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// Authentication middleware
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization required' });
  }

  // Simple token check (in reality, verify JWT)
  if (authHeader === 'Bearer secret-token') {
    req.user = { id: 1, name: 'Authorized User' };
    next();
  } else {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Public route
app.get('/api/public', (req, res) => {
  res.json({ message: 'This is public' });
});

// Protected route
app.get('/api/protected', requireAuth, (req, res) => {
  res.json({ message: 'This is protected', user: req.user });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server with middleware at http://localhost:${PORT}/`);
});

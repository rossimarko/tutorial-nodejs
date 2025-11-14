/**
 * Solution: Express Todo API
 * Complete CRUD API with validation and error handling
 */

import express from 'express';

const app = express();
const PORT = 3005;

// In-memory data store
let todos = [
  { id: 1, title: 'Learn Express', completed: false, createdAt: new Date() },
  { id: 2, title: 'Build API', completed: false, createdAt: new Date() }
];
let nextId = 3;

// Middleware
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Validation middleware
function validateTodo(req, res, next) {
  const { title } = req.body;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
  }

  if (title.length > 200) {
    return res.status(400).json({ error: 'Title must be less than 200 characters' });
  }

  next();
}

// Routes
// GET /api/todos - List all todos
app.get('/api/todos', (req, res) => {
  const { completed } = req.query;

  let filteredTodos = todos;

  if (completed !== undefined) {
    const isCompleted = completed === 'true';
    filteredTodos = todos.filter(t => t.completed === isCompleted);
  }

  res.json({
    count: filteredTodos.length,
    todos: filteredTodos
  });
});

// GET /api/todos/:id - Get one todo
app.get('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  res.json(todo);
});

// POST /api/todos - Create todo
app.post('/api/todos', validateTodo, (req, res) => {
  const { title } = req.body;

  const newTodo = {
    id: nextId++,
    title: title.trim(),
    completed: false,
    createdAt: new Date()
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /api/todos/:id - Update todo
app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  const { title, completed } = req.body;

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({ error: 'Title must be a non-empty string' });
    }
    todo.title = title.trim();
  }

  if (completed !== undefined) {
    if (typeof completed !== 'boolean') {
      return res.status(400).json({ error: 'Completed must be a boolean' });
    }
    todo.completed = completed;
  }

  todo.updatedAt = new Date();
  res.json(todo);
});

// DELETE /api/todos/:id - Delete todo
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos.splice(index, 1);
  res.status(204).send();
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Todo API running at http://localhost:${PORT}/`);
  console.log('Try: GET http://localhost:3005/api/todos');
});

export { app, server, todos };

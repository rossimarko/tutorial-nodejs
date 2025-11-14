# Module 5: Express.js Framework

## Learning Objectives

- Set up an Express.js application
- Implement middleware for request processing
- Create RESTful routes with Express Router
- Parse and validate request bodies
- Handle errors with error middleware
- Serve static files
- Use route parameters and query strings

## Theory

### What is Express?

Express is a minimal and flexible Node.js web application framework that provides:
- Robust routing
- Middleware system
- HTTP utility methods
- View rendering support

### Basic Express App

```javascript
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.listen(3000);
```

## Key Concepts

### Middleware
Functions that have access to request, response, and next middleware:

```javascript
app.use((req, res, next) => {
  console.log('Request:', req.method, req.url);
  next(); // Pass to next middleware
});
```

### Routing
```javascript
app.get('/users', getAllUsers);
app.post('/users', createUser);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);
```

### Request Body Parsing
```javascript
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse form data
```

### Error Handling
```javascript
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});
```

## Practice Exercises

- **exercises/todo-api.js** - Build a CRUD API for todos with Express

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [Express Middleware Guide](https://expressjs.com/en/guide/using-middleware.html)

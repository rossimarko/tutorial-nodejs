/**
 * Solution: REST API
 * Complete REST API implementation without frameworks
 */

import { createServer } from 'http';
import { URL } from 'url';

const PORT = 3002;
let todos = [
  { id: 1, title: 'Learn Node.js', completed: false },
  { id: 2, title: 'Build REST API', completed: false }
];
let nextId = 3;

// Parse JSON body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
  });
}

// Send JSON response
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

// Route handlers
async function handleGetTodos(req, res) {
  sendJSON(res, 200, todos);
}

async function handleGetTodo(req, res, id) {
  const todo = todos.find(t => t.id === parseInt(id));
  if (!todo) {
    sendJSON(res, 404, { error: 'Todo not found' });
    return;
  }
  sendJSON(res, 200, todo);
}

async function handleCreateTodo(req, res) {
  try {
    const body = await parseBody(req);
    const newTodo = {
      id: nextId++,
      title: body.title,
      completed: false
    };
    todos.push(newTodo);
    sendJSON(res, 201, newTodo);
  } catch (err) {
    sendJSON(res, 400, { error: 'Invalid JSON' });
  }
}

async function handleUpdateTodo(req, res, id) {
  const todo = todos.find(t => t.id === parseInt(id));
  if (!todo) {
    sendJSON(res, 404, { error: 'Todo not found' });
    return;
  }

  try {
    const body = await parseBody(req);
    if (body.title !== undefined) {
      todo.title = body.title;
    }
    if (body.completed !== undefined) {
      todo.completed = body.completed;
    }
    sendJSON(res, 200, todo);
  } catch (err) {
    sendJSON(res, 400, { error: 'Invalid JSON' });
  }
}

async function handleDeleteTodo(req, res, id) {
  const index = todos.findIndex(t => t.id === parseInt(id));
  if (index === -1) {
    sendJSON(res, 404, { error: 'Todo not found' });
    return;
  }
  todos.splice(index, 1);
  sendJSON(res, 204, null);
}

// Router
const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const path = url.pathname;
  const method = req.method;

  console.log(`${method} ${path}`);

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Routes
  if (path === '/todos' && method === 'GET') {
    await handleGetTodos(req, res);
  } else if (path.match(/^\/todos\/\d+$/) && method === 'GET') {
    const id = path.split('/')[2];
    await handleGetTodo(req, res, id);
  } else if (path === '/todos' && method === 'POST') {
    await handleCreateTodo(req, res);
  } else if (path.match(/^\/todos\/\d+$/) && method === 'PUT') {
    const id = path.split('/')[2];
    await handleUpdateTodo(req, res, id);
  } else if (path.match(/^\/todos\/\d+$/) && method === 'DELETE') {
    const id = path.split('/')[2];
    await handleDeleteTodo(req, res, id);
  } else {
    sendJSON(res, 404, { error: 'Not found' });
  }
});

server.listen(PORT, () => {
  console.log(`REST API running at http://localhost:${PORT}/`);
  console.log('Try: GET http://localhost:3002/todos');
});

export { server, todos };

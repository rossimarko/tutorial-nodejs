/**
 * Module 4 Example 2: Basic Routing
 * Demonstrates: Implementing routes without a framework
 */

import { createServer } from 'http';
import { URL } from 'url';

const PORT = 3001;

function handleHome(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>Home Page</h1><a href="/about">About</a>');
}

function handleAbout(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>About Page</h1><a href="/">Home</a>');
}

function handleAPI(req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    message: 'API endpoint',
    timestamp: new Date().toISOString()
  }));
}

function handleNotFound(req, res) {
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end('<h1>404 - Not Found</h1>');
}

const routes = {
  '/': handleHome,
  '/about': handleAbout,
  '/api': handleAPI
};

const server = createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const handler = routes[url.pathname] || handleNotFound;

  console.log(`${req.method} ${url.pathname}`);
  handler(req, res);
});

server.listen(PORT, () => {
  console.log(`Server with routing at http://localhost:${PORT}/`);
});

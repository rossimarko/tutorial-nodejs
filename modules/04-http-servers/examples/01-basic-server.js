/**
 * Module 4 Example 1: Basic HTTP Server
 * Demonstrates: Creating a simple HTTP server
 */

import { createServer } from 'http';

const PORT = 3000;

const server = createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Set response headers
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'X-Custom-Header': 'Node.js'
  });

  // Send response
  res.end(`
    <html>
      <head><title>Node.js Server</title></head>
      <body>
        <h1>Hello from Node.js!</h1>
        <p>Method: ${req.method}</p>
        <p>URL: ${req.url}</p>
      </body>
    </html>
  `);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log('Press Ctrl+C to stop');
});

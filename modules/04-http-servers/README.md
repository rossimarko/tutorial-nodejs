# Module 4: HTTP Servers

## Learning Objectives

- Create HTTP servers using native `http` module
- Handle requests and responses
- Parse URLs and query parameters
- Implement routing without frameworks
- Work with HTTP methods and status codes
- Handle request bodies

## Theory

### HTTP Protocol Basics

HTTP is a request-response protocol:
1. Client sends **Request** (method, URL, headers, body)
2. Server sends **Response** (status code, headers, body)

### Creating a Server

```javascript
import { createServer } from 'http';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
});

server.listen(3000);
```

## Key Concepts

### HTTP Methods
- **GET**: Retrieve data
- **POST**: Create data
- **PUT**: Update data
- **DELETE**: Remove data

### Status Codes
- **200**: OK
- **201**: Created
- **400**: Bad Request
- **404**: Not Found
- **500**: Internal Server Error

### Routing
```javascript
const routes = {
  '/': handleHome,
  '/api/users': handleUsers
};

const handler = routes[req.url] || handleNotFound;
```

## Practice Exercises

- **exercises/rest-api.js** - Build a REST API without frameworks

## Resources

- [Node.js HTTP Module](https://nodejs.org/api/http.html)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

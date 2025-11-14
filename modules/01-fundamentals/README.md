# Module 1: Node.js Fundamentals

## Learning Objectives

By the end of this module, you will be able to:
- Understand the Node.js runtime and its architecture
- Use the Node.js REPL for quick experiments
- Manage packages with npm
- Work with both ESM and CommonJS module systems
- Utilize global objects like `process`, `console`, and `Buffer`
- Parse command-line arguments with `process.argv`

## Theory

### What is Node.js?

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript outside the browser, making it perfect for:
- Server-side applications
- Command-line tools
- Build tools and automation
- Real-time applications

### The Node.js Runtime

```
┌───────────────────────────┐
│    JavaScript Code        │
└───────────┬───────────────┘
            │
┌───────────▼───────────────┐
│    V8 JavaScript Engine   │
└───────────┬───────────────┘
            │
┌───────────▼───────────────┐
│    Node.js APIs           │
│  (fs, http, crypto, etc)  │
└───────────┬───────────────┘
            │
┌───────────▼───────────────┐
│    Operating System       │
└───────────────────────────┘
```

### Node.js REPL

The Read-Eval-Print Loop (REPL) is an interactive programming environment:

```bash
$ node
> 1 + 1
2
> const greet = (name) => `Hello, ${name}!`
undefined
> greet('World')
'Hello, World!'
> .exit
```

### Module Systems

#### ESM (ECMAScript Modules) - Modern Approach

```javascript
// math.js
export function add(a, b) {
  return a + b;
}

export const PI = 3.14159;

// main.js
import { add, PI } from './math.js';
```

#### CommonJS - Legacy Approach

```javascript
// math.js
function add(a, b) {
  return a + b;
}

module.exports = { add };

// main.js
const { add } = require('./math');
```

**This tutorial uses ESM exclusively** (set `"type": "module"` in package.json)

### Global Objects

Node.js provides several global objects available everywhere:

#### process
```javascript
// Command-line arguments
console.log(process.argv);

// Environment variables
console.log(process.env.NODE_ENV);

// Exit the process
process.exit(0);

// Current working directory
console.log(process.cwd());
```

#### console
```javascript
console.log('Info message');
console.error('Error message');
console.warn('Warning message');
console.table([{ name: 'Alice', age: 30 }]);
```

#### Buffer
```javascript
// Create buffer from string
const buf = Buffer.from('Hello');

// Create buffer with size
const buf2 = Buffer.alloc(10);

// Convert to string
console.log(buf.toString()); // 'Hello'
```

## Key Concepts

### 1. Package Management with npm

```bash
# Initialize a new project
npm init -y

# Install dependencies
npm install express

# Install dev dependencies
npm install --save-dev vitest

# Run scripts
npm run test

# Update packages
npm update
```

### 2. Package.json Structure

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "type": "module",           // Enable ESM
  "scripts": {
    "start": "node index.js",
    "test": "vitest"
  },
  "dependencies": {},
  "devDependencies": {}
}
```

### 3. Command-Line Arguments

```javascript
// Run: node app.js hello world --flag
console.log(process.argv);
// Output: ['/path/to/node', '/path/to/app.js', 'hello', 'world', '--flag']

const args = process.argv.slice(2); // Remove node and script path
console.log(args); // ['hello', 'world', '--flag']
```

### 4. Environment Variables

```javascript
// Access environment variables
const port = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV === 'development';

// Run with environment variables:
// PORT=8080 NODE_ENV=production node app.js
```

## Common Pitfalls

### ❌ Forgetting .js extension with ESM
```javascript
import { add } from './math';  // Error!
import { add } from './math.js';  // Correct
```

### ❌ Mixing CommonJS and ESM
```javascript
// Don't mix in the same file
import fs from 'fs';
const path = require('path');  // Error!
```

### ❌ Not handling process exit
```javascript
// Bad: Silent failure
process.on('uncaughtException', () => {});

// Good: Log and exit
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
```

### ❌ Blocking the event loop
```javascript
// Bad: Synchronous blocking
const data = fs.readFileSync('huge-file.txt');

// Good: Asynchronous
const data = await fs.promises.readFile('huge-file.txt');
```

## Practice Exercises

1. **examples/01-hello-node.js** - Your first Node.js program
2. **examples/02-process-info.js** - Working with process object
3. **examples/03-buffer-basics.js** - Buffer manipulation
4. **examples/04-modules.js** - Creating and importing modules
5. **exercises/cli-calculator.js** - Build a command-line calculator

## Resources

- [Node.js Official Documentation](https://nodejs.org/docs/latest-v24.x/api/)
- [Node.js Process Object](https://nodejs.org/api/process.html)
- [Node.js Modules](https://nodejs.org/api/esm.html)
- [npm Documentation](https://docs.npmjs.com/)
- [Buffer Documentation](https://nodejs.org/api/buffer.html)

## Next Steps

Once you're comfortable with these fundamentals, proceed to **Module 2: Asynchronous Programming** to learn about the event loop, promises, and async/await.

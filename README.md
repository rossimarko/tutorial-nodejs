# Node.js Tutorial - Zero to Hero

Progressive learning path for modern Node.js development with hands-on exercises and comprehensive testing.

## 🎯 Prerequisites

- Node.js 24.x LTS or higher
- Basic JavaScript knowledge (ES6+)
- Terminal/command line basics
- Git fundamentals

## 📦 Installation

```bash
git clone <repo-url>
cd nodejs-tutorial
npm install
```

## 📚 Learning Path

Complete the modules in order for the best learning experience:

### 1. **Node.js Fundamentals** (2-3 hours)
- Node.js runtime and REPL
- npm and package management
- ESM vs CommonJS modules
- Global objects and Buffer
- **Exercise**: Build a CLI calculator

### 2. **Asynchronous Programming** (3-4 hours)
- Event Loop mechanics
- Callbacks → Promises → async/await
- Promise combinators
- EventEmitter pattern
- **Exercise**: Async task queue system

### 3. **File System Operations** (2-3 hours)
- fs/promises API
- Streams (Readable, Writable, Transform)
- Buffer manipulation
- Path utilities
- **Exercise**: File backup tool with progress

### 4. **HTTP Servers** (3-4 hours)
- Native http/https modules
- Request/Response cycle
- Headers and routing
- URL parsing
- **Exercise**: REST API without frameworks

### 5. **Express.js Framework** (4-5 hours)
- Middleware and routing
- Request validation
- Error handling
- Static files
- **Exercise**: CRUD API for todos

### 6. **Database Integration** (4-5 hours)
- PostgreSQL with pg driver
- Connection pooling
- Prepared statements
- Transactions
- **Exercise**: Persistent todo storage

### 7. **Testing & Debugging** (3-4 hours)
- Vitest configuration
- Unit vs Integration tests
- Mocking strategies
- Coverage reports
- **Exercise**: Complete test suite

## 🧪 Running Tests

```bash
npm test              # Run all tests
npm run test:ui       # Interactive UI mode
npm run test:coverage # Generate coverage report
```

## 🔍 Code Quality

```bash
npm run lint          # Check code style
```

## 📖 How to Use This Tutorial

1. **Read the module README** - Understand the concepts
2. **Study the examples** - See patterns in action
3. **Complete the exercises** - Apply what you learned
4. **Check the solutions** - Compare your approach
5. **Run the tests** - Verify your implementation

## 🎓 Learning Tips

- Type out all code examples (don't copy-paste)
- Experiment by modifying examples
- Read error messages carefully
- Use Node.js debugger for complex issues
- Complete exercises before checking solutions

## 📚 Resources

- [Node.js Official Documentation](https://nodejs.org/docs/latest-v24.x/api/)
- [Vitest Documentation](https://vitest.dev)
- [Express.js Guide](https://expressjs.com)
- [MDN JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 🤝 Contributing

Found an issue or want to improve the tutorial? Contributions are welcome!

## 📄 License

MIT License - See LICENSE file for details

---

**Ready to start?** Head to `modules/01-fundamentals/` and begin your Node.js journey!
# Module 7: Testing & Debugging

## Learning Objectives

- Write unit and integration tests with Vitest
- Use mocking to isolate code under test
- Generate and interpret coverage reports
- Debug Node.js applications effectively
- Test async code properly
- Follow testing best practices

## Theory

### Testing Pyramid

```
      /\
     /  \    E2E Tests (Few)
    /____\
   /      \  Integration Tests (Some)
  /________\
 /          \ Unit Tests (Many)
/____________\
```

### Unit vs Integration Tests

- **Unit Tests**: Test individual functions in isolation
- **Integration Tests**: Test multiple components together
- **E2E Tests**: Test the entire application flow

### Vitest Advantages

- Fast execution with smart watch mode
- ESM support out of the box
- Compatible with Jest API
- Built-in coverage with c8/v8

## Key Concepts

### Basic Test Structure

```javascript
import { describe, it, expect } from 'vitest';

describe('Calculator', () => {
  describe('add', () => {
    it('should add two numbers', () => {
      expect(add(2, 3)).toBe(5);
    });
  });
});
```

### Mocking with vi.mock

```javascript
import { vi } from 'vitest';

// Mock entire module
vi.mock('./database.js', () => ({
  query: vi.fn()
}));

// Mock function
const mockFn = vi.fn();
mockFn.mockReturnValue(42);
```

### Testing Async Code

```javascript
it('should fetch data', async () => {
  const data = await fetchData();
  expect(data).toBeDefined();
});
```

### Coverage Reports

```bash
npm run test:coverage
```

Aim for >80% coverage for critical code.

## Debugging Techniques

### console.log Debugging
```javascript
console.log('Debug:', variable);
```

### Node.js Debugger
```bash
node inspect app.js
```

### VSCode Debugger
Set breakpoints and use the built-in debugger.

## Practice Exercises

- **exercises/test-suite.js** - Write comprehensive tests for a module

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Node.js Debugging Guide](https://nodejs.org/en/docs/guides/debugging-getting-started/)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

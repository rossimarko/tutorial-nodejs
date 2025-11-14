# Module 2: Asynchronous Programming

## Learning Objectives

By the end of this module, you will be able to:
- Understand how the Node.js event loop works
- Write asynchronous code using callbacks, promises, and async/await
- Use Promise combinators (all, race, allSettled, any)
- Implement and use the EventEmitter pattern
- Handle errors properly in asynchronous code
- Avoid common async pitfalls

## Theory

### The Event Loop

Node.js is single-threaded but handles concurrency through the event loop:

```
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────▼─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────▼─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────▼─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────▼─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────▼─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

**Key Points:**
- JavaScript is single-threaded
- Async operations are offloaded to system APIs
- Callbacks execute when operations complete
- Non-blocking I/O allows high concurrency

### Evolution of Async Patterns

#### 1. Callbacks (Old Way)
```javascript
// Callback hell / Pyramid of doom
fs.readFile('file1.txt', (err, data1) => {
  if (err) {
    return handleError(err);
  }
  fs.readFile('file2.txt', (err, data2) => {
    if (err) {
      return handleError(err);
    }
    fs.readFile('file3.txt', (err, data3) => {
      if (err) {
        return handleError(err);
      }
      console.log('Done!');
    });
  });
});
```

#### 2. Promises (Better)
```javascript
// Flatter, more readable
readFileAsync('file1.txt')
  .then(data1 => readFileAsync('file2.txt'))
  .then(data2 => readFileAsync('file3.txt'))
  .then(data3 => console.log('Done!'))
  .catch(err => handleError(err));
```

#### 3. Async/Await (Best)
```javascript
// Looks synchronous, but still async
try {
  const data1 = await readFileAsync('file1.txt');
  const data2 = await readFileAsync('file2.txt');
  const data3 = await readFileAsync('file3.txt');
  console.log('Done!');
} catch (err) {
  handleError(err);
}
```

### Promises in Depth

#### Creating Promises
```javascript
const myPromise = new Promise((resolve, reject) => {
  // Async operation
  if (success) {
    resolve(value);
  } else {
    reject(error);
  }
});
```

#### Promise States
- **Pending**: Initial state
- **Fulfilled**: Operation completed successfully
- **Rejected**: Operation failed

#### Promise Combinators

```javascript
// Promise.all - Wait for all (fails fast)
const results = await Promise.all([promise1, promise2, promise3]);

// Promise.race - First to finish
const winner = await Promise.race([promise1, promise2]);

// Promise.allSettled - Wait for all (never rejects)
const results = await Promise.allSettled([promise1, promise2]);

// Promise.any - First to succeed
const result = await Promise.any([promise1, promise2]);
```

### Async/Await

Syntactic sugar over promises that makes async code look synchronous:

```javascript
// Function must be marked async
async function fetchData() {
  // await pauses execution until promise resolves
  const data = await fetch('https://api.example.com/data');
  return data;
}

// Async functions always return a promise
fetchData().then(data => console.log(data));
```

### EventEmitter Pattern

Node.js uses events extensively:

```javascript
import { EventEmitter } from 'events';

const emitter = new EventEmitter();

// Subscribe to event
emitter.on('data', (data) => {
  console.log('Received:', data);
});

// Emit event
emitter.emit('data', { message: 'Hello' });
```

## Key Concepts

### 1. Error Handling in Async Code

```javascript
// Promises
fetchData()
  .then(data => processData(data))
  .catch(err => console.error('Error:', err))
  .finally(() => console.log('Cleanup'));

// Async/Await
try {
  const data = await fetchData();
  await processData(data);
} catch (err) {
  console.error('Error:', err);
} finally {
  console.log('Cleanup');
}
```

### 2. Parallel vs Sequential

```javascript
// Sequential (slow - 3 seconds total)
const result1 = await slowTask1(); // 1 second
const result2 = await slowTask2(); // 1 second
const result3 = await slowTask3(); // 1 second

// Parallel (fast - 1 second total)
const [result1, result2, result3] = await Promise.all([
  slowTask1(),
  slowTask2(),
  slowTask3()
]);
```

### 3. Creating Custom Promises

```javascript
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Usage
await delay(1000); // Wait 1 second
console.log('Done waiting');
```

### 4. EventEmitter Best Practices

```javascript
class MyEmitter extends EventEmitter {
  constructor() {
    super();
    this.setMaxListeners(20); // Avoid memory leaks
  }
}

const emitter = new MyEmitter();

// Always handle errors
emitter.on('error', (err) => {
  console.error('Error:', err);
});

// Remove listeners when done
const handler = () => console.log('Event');
emitter.on('event', handler);
emitter.off('event', handler); // Clean up
```

## Common Pitfalls

### ❌ Forgetting await
```javascript
// Bug: Returns promise, not data
async function getData() {
  return fetchData(); // Missing await!
}

// Fix
async function getData() {
  return await fetchData();
}
```

### ❌ Not handling promise rejections
```javascript
// Bug: Unhandled rejection
async function riskyOperation() {
  await mightFail(); // No try/catch!
}

// Fix
async function riskyOperation() {
  try {
    await mightFail();
  } catch (err) {
    handleError(err);
  }
}
```

### ❌ Sequential when should be parallel
```javascript
// Slow
const user = await getUser(id);
const posts = await getPosts(id); // Doesn't depend on user

// Fast
const [user, posts] = await Promise.all([
  getUser(id),
  getPosts(id)
]);
```

### ❌ Memory leaks with EventEmitters
```javascript
// Bug: Listeners never removed
function createHandler() {
  emitter.on('event', () => {
    // Heavy operation
  });
}

// Fix: Remove listeners
function createHandler() {
  const handler = () => {
    // Heavy operation
  };
  emitter.on('event', handler);

  // Later...
  emitter.off('event', handler);
}
```

## Practice Exercises

1. **examples/01-callbacks-to-promises.js** - Converting callbacks to promises
2. **examples/02-async-await.js** - Using async/await
3. **examples/03-promise-combinators.js** - Promise.all, race, etc.
4. **examples/04-event-emitter.js** - EventEmitter pattern
5. **exercises/task-queue.js** - Build an async task queue

## Resources

- [MDN: Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN: async/await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)
- [Node.js Event Loop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
- [EventEmitter Documentation](https://nodejs.org/api/events.html)

## Next Steps

Once you master asynchronous programming, proceed to **Module 3: File System Operations** to apply these patterns to real I/O operations.

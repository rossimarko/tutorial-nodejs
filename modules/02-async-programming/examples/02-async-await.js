/**
 * Module 2 Example 2: Async/Await Patterns
 * Demonstrates: Various async/await patterns and best practices
 */

console.log('=== Async/Await Patterns ===\n');

// Simulated async operations
function fetchData(id, delay = 100) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, data: `Data for ${id}` });
    }, delay);
  });
}

function fetchWithError(shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Operation failed'));
      } else {
        resolve({ success: true });
      }
    }, 100);
  });
}

// 1. Basic async/await
async function basicExample() {
  console.log('1. Basic Async/Await:');
  const result = await fetchData(1);
  console.log('Result:', result.data);
  console.log();
}

// 2. Error handling with try/catch
async function errorHandlingExample() {
  console.log('2. Error Handling:');

  // Success case
  try {
    const result = await fetchWithError(false);
    console.log('Success:', result);
  } catch (err) {
    console.error('Caught error:', err.message);
  }

  // Failure case
  try {
    const result = await fetchWithError(true);
    console.log('Success:', result);
  } catch (err) {
    console.error('Caught error:', err.message);
  }
  console.log();
}

// 3. Sequential vs Parallel execution
async function sequentialVsParallel() {
  console.log('3. Sequential vs Parallel:');

  // Sequential (slow - 300ms total)
  console.time('Sequential');
  const result1 = await fetchData(1, 100);
  const result2 = await fetchData(2, 100);
  const result3 = await fetchData(3, 100);
  console.timeEnd('Sequential');
  console.log('Results:', [result1, result2, result3].map(r => r.data));

  // Parallel (fast - ~100ms total)
  console.time('Parallel');
  const [pResult1, pResult2, pResult3] = await Promise.all([
    fetchData(4, 100),
    fetchData(5, 100),
    fetchData(6, 100)
  ]);
  console.timeEnd('Parallel');
  console.log('Results:', [pResult1, pResult2, pResult3].map(r => r.data));
  console.log();
}

// 4. Async functions always return promises
async function returnsPromise() {
  return 'This is wrapped in a promise';
}

function demonstratePromiseReturn() {
  console.log('4. Async Functions Return Promises:');
  const result = returnsPromise();
  console.log('Direct call returns:', result.constructor.name); // Promise

  result.then(value => {
    console.log('Resolved value:', value);
    console.log();
  });
}

// 5. Awaiting non-promises
async function awaitingNonPromises() {
  console.log('5. Awaiting Non-Promises:');

  // You can await non-promises (they're automatically wrapped)
  const sync = await 42;
  console.log('Awaited number:', sync);

  const string = await 'Hello';
  console.log('Awaited string:', string);
  console.log();
}

// 6. Multiple awaits with dependencies
async function dependentOperations() {
  console.log('6. Dependent Operations:');

  // Operation 2 depends on operation 1
  const user = await fetchData('user123');
  console.log('Fetched:', user.data);

  // Use result from first operation
  const profile = await fetchData(`profile-${user.id}`);
  console.log('Fetched:', profile.data);
  console.log();
}

// 7. Async IIFE (Immediately Invoked Function Expression)
console.log('7. Async IIFE:');
(async () => {
  const result = await fetchData('iife-data');
  console.log('IIFE result:', result.data);
  console.log();
})();

// 8. Async iteration
async function asyncIteration() {
  console.log('8. Async Iteration:');

  const ids = [1, 2, 3, 4, 5];

  // Process sequentially
  for (const id of ids) {
    const result = await fetchData(id, 50);
    console.log('Processed:', result.data);
  }
  console.log();
}

// Run all examples
(async () => {
  await basicExample();
  await errorHandlingExample();
  await sequentialVsParallel();
  demonstratePromiseReturn();

  setTimeout(async () => {
    await awaitingNonPromises();
    await dependentOperations();

    setTimeout(async () => {
      await asyncIteration();
    }, 500);
  }, 500);
})();

/**
 * Module 2 Example 3: Promise Combinators
 * Demonstrates: Promise.all, race, allSettled, any
 */

console.log('=== Promise Combinators ===\n');

// Simulated async operations with varying outcomes
function fastOperation() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ name: 'fast', time: 100 }), 100);
  });
}

function slowOperation() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ name: 'slow', time: 500 }), 500);
  });
}

function failingOperation() {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Operation failed')), 200);
  });
}

function verySlowOperation() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ name: 'very-slow', time: 1000 }), 1000);
  });
}

// 1. Promise.all - Wait for all to complete (fails fast)
async function demonstratePromiseAll() {
  console.log('1. Promise.all (wait for all, fail fast):');

  try {
    console.time('Promise.all success');
    const results = await Promise.all([
      fastOperation(),
      slowOperation()
    ]);
    console.timeEnd('Promise.all success');
    console.log('All succeeded:', results);
  } catch (err) {
    console.error('Error:', err.message);
  }

  // With failure - entire operation fails
  try {
    console.time('Promise.all failure');
    const results = await Promise.all([
      fastOperation(),
      failingOperation(),
      slowOperation() // This completes but result is ignored
    ]);
    console.timeEnd('Promise.all failure');
    console.log('Results:', results);
  } catch (err) {
    console.timeEnd('Promise.all failure');
    console.error('Caught error:', err.message);
  }
  console.log();
}

// 2. Promise.race - First to complete (resolve or reject)
async function demonstratePromiseRace() {
  console.log('2. Promise.race (first to finish wins):');

  console.time('Promise.race');
  const winner = await Promise.race([
    fastOperation(),
    slowOperation(),
    verySlowOperation()
  ]);
  console.timeEnd('Promise.race');
  console.log('Winner:', winner);

  // Race with failure
  try {
    console.time('Promise.race with failure');
    const result = await Promise.race([
      failingOperation(), // Fails at 200ms
      slowOperation()     // Succeeds at 500ms
    ]);
    console.log('Result:', result);
  } catch (err) {
    console.timeEnd('Promise.race with failure');
    console.error('Failed first:', err.message);
  }
  console.log();
}

// 3. Promise.allSettled - Wait for all (never rejects)
async function demonstratePromiseAllSettled() {
  console.log('3. Promise.allSettled (wait for all, never fails):');

  console.time('Promise.allSettled');
  const results = await Promise.allSettled([
    fastOperation(),
    failingOperation(),
    slowOperation()
  ]);
  console.timeEnd('Promise.allSettled');

  console.log('All results:');
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`  [${index}] Success:`, result.value);
    } else {
      console.log(`  [${index}] Failed:`, result.reason.message);
    }
  });
  console.log();
}

// 4. Promise.any - First to succeed (ignores rejections)
async function demonstratePromiseAny() {
  console.log('4. Promise.any (first success wins):');

  try {
    console.time('Promise.any');
    const result = await Promise.any([
      failingOperation(),  // Fails at 200ms
      fastOperation(),     // Succeeds at 100ms - WINNER
      slowOperation()      // Would succeed at 500ms
    ]);
    console.timeEnd('Promise.any');
    console.log('First success:', result);
  } catch (err) {
    console.error('All failed:', err);
  }

  // All operations fail
  try {
    const result = await Promise.any([
      failingOperation(),
      Promise.reject(new Error('Another failure'))
    ]);
    console.log('Result:', result);
  } catch (err) {
    console.error('All operations failed:', err.message);
  }
  console.log();
}

// 5. Practical example: Timeout pattern
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Operation timed out')), ms);
  });
  return Promise.race([promise, timeout]);
}

async function demonstrateTimeout() {
  console.log('5. Practical: Timeout Pattern');

  // Operation completes in time
  try {
    const result = await withTimeout(fastOperation(), 200);
    console.log('Completed in time:', result);
  } catch (err) {
    console.error('Error:', err.message);
  }

  // Operation times out
  try {
    const result = await withTimeout(slowOperation(), 200);
    console.log('Result:', result);
  } catch (err) {
    console.error('Timed out:', err.message);
  }
  console.log();
}

// 6. Practical example: Retry with fallback
async function withFallback(primaryOp, fallbackOp) {
  try {
    return await primaryOp();
  } catch (err) {
    console.log('Primary failed, trying fallback...');
    return await fallbackOp();
  }
}

async function demonstrateFallback() {
  console.log('6. Practical: Fallback Pattern');

  const result = await withFallback(
    () => failingOperation(),
    () => fastOperation()
  );
  console.log('Final result:', result);
}

// Run all examples sequentially
(async () => {
  await demonstratePromiseAll();

  setTimeout(async () => {
    await demonstratePromiseRace();

    setTimeout(async () => {
      await demonstratePromiseAllSettled();

      setTimeout(async () => {
        await demonstratePromiseAny();

        setTimeout(async () => {
          await demonstrateTimeout();

          setTimeout(async () => {
            await demonstrateFallback();
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
})();

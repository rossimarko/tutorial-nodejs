/**
 * Exercise: Async Task Queue
 * Difficulty: Medium
 *
 * Build an asynchronous task queue that processes tasks concurrently
 * with a maximum concurrency limit.
 *
 * Requirements:
 * - Process multiple async tasks
 * - Limit concurrent execution (e.g., max 3 at a time)
 * - Emit events for task lifecycle (start, complete, error)
 * - Return results in order of completion
 *
 * TODO:
 * 1. Create a TaskQueue class that extends EventEmitter
 * 2. Implement addTask(task) method
 * 3. Implement run() method with concurrency control
 * 4. Emit events: 'taskStart', 'taskComplete', 'taskError', 'allComplete'
 * 5. Handle errors gracefully
 * 6. Track completed vs failed tasks
 *
 * Expected behavior:
 *   const queue = new TaskQueue(2); // Max 2 concurrent
 *   queue.on('taskComplete', (result) => console.log('Done:', result));
 *   queue.addTask(async () => { ... });
 *   await queue.run();
 */

import { EventEmitter } from 'events';

// TODO: Implement TaskQueue class
class TaskQueue extends EventEmitter {
  constructor(concurrency = 3) {
    super();
    // TODO: Initialize properties
    // - concurrency limit
    // - tasks array
    // - running count
    // - results array
  }

  addTask(task) {
    // TODO: Add task to queue
  }

  async run() {
    // TODO: Process all tasks with concurrency limit
    // Hint: Use Promise.race or manual promise tracking
  }

  async processNext() {
    // TODO: Process the next task in queue
  }
}

// Test your implementation
async function testTaskQueue() {
  const queue = new TaskQueue(2);

  // Mock async tasks
  const createTask = (id, duration) => async () => {
    await new Promise(resolve => setTimeout(resolve, duration));
    return `Task ${id} completed`;
  };

  // Add event listeners
  queue.on('taskStart', (taskId) => {
    console.log(`Starting task ${taskId}`);
  });

  queue.on('taskComplete', (taskId, result) => {
    console.log(`Completed task ${taskId}:`, result);
  });

  queue.on('taskError', (taskId, error) => {
    console.error(`Task ${taskId} failed:`, error.message);
  });

  queue.on('allComplete', (stats) => {
    console.log('All tasks complete!', stats);
  });

  // Add tasks
  queue.addTask(createTask(1, 1000));
  queue.addTask(createTask(2, 500));
  queue.addTask(createTask(3, 2000));
  queue.addTask(createTask(4, 300));
  queue.addTask(createTask(5, 800));

  // Run queue
  await queue.run();
}

// Uncomment to test
// testTaskQueue();

console.log('Task Queue - TODO: Implement me!');

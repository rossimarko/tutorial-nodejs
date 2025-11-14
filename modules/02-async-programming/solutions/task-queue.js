/**
 * Solution: Async Task Queue
 *
 * A sophisticated async task queue with concurrency control,
 * event emission, and comprehensive error handling.
 */

import { EventEmitter } from 'events';

/**
 * TaskQueue - Process async tasks with concurrency control
 */
class TaskQueue extends EventEmitter {
  /**
   * Create a new TaskQueue
   * @param {number} concurrency - Maximum number of concurrent tasks
   */
  constructor(concurrency = 3) {
    super();
    this.concurrency = concurrency;
    this.tasks = [];
    this.running = 0;
    this.completed = 0;
    this.failed = 0;
    this.results = [];
    this.taskId = 0;
  }

  /**
   * Add a task to the queue
   * @param {Function} task - Async function to execute
   */
  addTask(task) {
    const id = ++this.taskId;
    this.tasks.push({ id, task });
  }

  /**
   * Run all tasks in the queue with concurrency control
   * @returns {Promise<Array>} Results of all tasks
   */
  async run() {
    if (this.tasks.length === 0) {
      this.emit('allComplete', { completed: 0, failed: 0 });
      return [];
    }

    const totalTasks = this.tasks.length;

    // Create initial batch of workers
    const workers = [];
    for (let i = 0; i < Math.min(this.concurrency, this.tasks.length); i++) {
      workers.push(this.worker());
    }

    // Wait for all workers to complete
    await Promise.all(workers);

    // Emit completion event
    this.emit('allComplete', {
      total: totalTasks,
      completed: this.completed,
      failed: this.failed
    });

    return this.results;
  }

  /**
   * Worker that processes tasks from the queue
   */
  async worker() {
    while (this.tasks.length > 0) {
      const taskItem = this.tasks.shift();
      if (!taskItem) {
        break;
      }

      this.running++;
      this.emit('taskStart', taskItem.id);

      try {
        const result = await taskItem.task();
        this.completed++;
        this.results.push({ id: taskItem.id, status: 'completed', result });
        this.emit('taskComplete', taskItem.id, result);
      } catch (error) {
        this.failed++;
        this.results.push({ id: taskItem.id, status: 'failed', error });
        this.emit('taskError', taskItem.id, error);
      } finally {
        this.running--;
      }
    }
  }

  /**
   * Get queue statistics
   * @returns {Object} Current queue stats
   */
  getStats() {
    return {
      pending: this.tasks.length,
      running: this.running,
      completed: this.completed,
      failed: this.failed
    };
  }
}

/**
 * Alternative implementation using semaphore pattern
 */
class TaskQueueSemaphore extends EventEmitter {
  constructor(concurrency = 3) {
    super();
    this.concurrency = concurrency;
    this.tasks = [];
    this.activeTasks = new Set();
  }

  addTask(task) {
    this.tasks.push(task);
  }

  async run() {
    const results = [];

    // Process all tasks
    const taskPromises = this.tasks.map((task, index) =>
      this.executeWithLimit(task, index)
    );

    const allResults = await Promise.allSettled(taskPromises);

    allResults.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        results.push({ index, result: result.value });
        this.emit('taskComplete', index, result.value);
      } else {
        results.push({ index, error: result.reason });
        this.emit('taskError', index, result.reason);
      }
    });

    this.emit('allComplete', { total: this.tasks.length });
    return results;
  }

  async executeWithLimit(task, index) {
    // Wait until we have capacity
    while (this.activeTasks.size >= this.concurrency) {
      await Promise.race(this.activeTasks);
    }

    // Create promise for this task
    const promise = (async () => {
      this.emit('taskStart', index);
      try {
        return await task();
      } finally {
        this.activeTasks.delete(promise);
      }
    })();

    this.activeTasks.add(promise);
    return promise;
  }
}

// Demo and test
async function demo() {
  console.log('=== Task Queue Demo ===\n');

  const queue = new TaskQueue(2); // Max 2 concurrent tasks

  // Mock async tasks with varying durations
  const createTask = (id, duration, shouldFail = false) => async () => {
    console.log(`  Task ${id} started (${duration}ms)`);
    await new Promise(resolve => setTimeout(resolve, duration));

    if (shouldFail) {
      throw new Error(`Task ${id} failed`);
    }

    return `Task ${id} result`;
  };

  // Add event listeners
  queue.on('taskStart', (taskId) => {
    console.log(`[START] Task ${taskId}`);
  });

  queue.on('taskComplete', (taskId, result) => {
    console.log(`[COMPLETE] Task ${taskId}: ${result}`);
  });

  queue.on('taskError', (taskId, error) => {
    console.error(`[ERROR] Task ${taskId}: ${error.message}`);
  });

  queue.on('allComplete', (stats) => {
    console.log('\n[FINISHED]', stats);
  });

  // Add tasks
  queue.addTask(createTask(1, 1000));
  queue.addTask(createTask(2, 500));
  queue.addTask(createTask(3, 2000));
  queue.addTask(createTask(4, 300, true)); // This one fails
  queue.addTask(createTask(5, 800));

  console.log('Starting queue with 5 tasks, max 2 concurrent...\n');

  // Run the queue
  const results = await queue.run();

  console.log('\nFinal results:');
  results.forEach(r => {
    if (r.status === 'completed') {
      console.log(`  Task ${r.id}: ✓ ${r.result}`);
    } else {
      console.log(`  Task ${r.id}: ✗ ${r.error.message}`);
    }
  });
}

// Run demo
demo().catch(console.error);

// Export for testing
export { TaskQueue, TaskQueueSemaphore };

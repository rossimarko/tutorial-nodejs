/**
 * Module 2 Example 4: EventEmitter Pattern
 * Demonstrates: Events, listeners, custom event emitters
 */

import { EventEmitter } from 'events';

console.log('=== EventEmitter Pattern ===\n');

// 1. Basic EventEmitter usage
function basicEventEmitter() {
  console.log('1. Basic EventEmitter:');

  const emitter = new EventEmitter();

  // Register listener
  emitter.on('greet', (name) => {
    console.log(`Hello, ${name}!`);
  });

  // Emit event
  emitter.emit('greet', 'Alice');
  emitter.emit('greet', 'Bob');
  console.log();
}

// 2. Multiple listeners
function multipleListeners() {
  console.log('2. Multiple Listeners:');

  const emitter = new EventEmitter();

  // Multiple listeners for same event
  emitter.on('data', (data) => {
    console.log('Listener 1:', data);
  });

  emitter.on('data', (data) => {
    console.log('Listener 2:', data);
  });

  emitter.emit('data', 'Hello');
  console.log();
}

// 3. Once listener (fires only once)
function onceListener() {
  console.log('3. Once Listener:');

  const emitter = new EventEmitter();

  // Regular listener
  emitter.on('repeat', () => {
    console.log('This fires every time');
  });

  // Once listener
  emitter.once('repeat', () => {
    console.log('This fires only once');
  });

  emitter.emit('repeat');
  emitter.emit('repeat');
  emitter.emit('repeat');
  console.log();
}

// 4. Removing listeners
function removingListeners() {
  console.log('4. Removing Listeners:');

  const emitter = new EventEmitter();

  const handler = (msg) => {
    console.log('Handler:', msg);
  };

  emitter.on('message', handler);

  emitter.emit('message', 'First');

  // Remove specific listener
  emitter.off('message', handler);

  emitter.emit('message', 'Second'); // Won't log
  console.log('(Second message listener was removed)');
  console.log();
}

// 5. Error handling
function errorHandling() {
  console.log('5. Error Handling:');

  const emitter = new EventEmitter();

  // Always register error handler!
  emitter.on('error', (err) => {
    console.error('Caught error:', err.message);
  });

  // Emit error event
  emitter.emit('error', new Error('Something went wrong'));
  console.log();
}

// 6. Custom EventEmitter class
class TaskRunner extends EventEmitter {
  constructor() {
    super();
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
    this.emit('taskAdded', task);
  }

  async runTasks() {
    this.emit('start', this.tasks.length);

    for (const task of this.tasks) {
      this.emit('taskStart', task);

      try {
        await this.executeTask(task);
        this.emit('taskComplete', task);
      } catch (err) {
        this.emit('taskError', task, err);
      }
    }

    this.emit('complete');
  }

  async executeTask(task) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });
  }
}

async function customEventEmitter() {
  console.log('6. Custom EventEmitter Class:');

  const runner = new TaskRunner();

  // Register listeners
  runner.on('taskAdded', (task) => {
    console.log('Task added:', task);
  });

  runner.on('start', (count) => {
    console.log(`Starting ${count} tasks...`);
  });

  runner.on('taskStart', (task) => {
    console.log('Running:', task);
  });

  runner.on('taskComplete', (task) => {
    console.log('Completed:', task);
  });

  runner.on('complete', () => {
    console.log('All tasks completed!');
  });

  // Add tasks
  runner.addTask('Download files');
  runner.addTask('Process data');
  runner.addTask('Generate report');

  // Run tasks
  await runner.runTasks();
  console.log();
}

// 7. Event names and listener count
function eventMetadata() {
  console.log('7. Event Metadata:');

  const emitter = new EventEmitter();

  emitter.on('event1', () => {});
  emitter.on('event1', () => {});
  emitter.on('event2', () => {});

  console.log('Event names:', emitter.eventNames());
  console.log('event1 listener count:', emitter.listenerCount('event1'));
  console.log('event2 listener count:', emitter.listenerCount('event2'));
  console.log();
}

// 8. Max listeners warning
function maxListeners() {
  console.log('8. Max Listeners:');

  const emitter = new EventEmitter();

  // Default max is 10
  console.log('Default max listeners:', emitter.getMaxListeners());

  // Set custom max to avoid memory leak warnings
  emitter.setMaxListeners(20);
  console.log('Updated max listeners:', emitter.getMaxListeners());
  console.log();
}

// Run all examples
(async () => {
  basicEventEmitter();
  multipleListeners();
  onceListener();
  removingListeners();
  errorHandling();
  await customEventEmitter();
  eventMetadata();
  maxListeners();
})();

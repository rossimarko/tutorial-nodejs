/**
 * Tests for Task Queue
 * Demonstrates: Testing async code, event emitters, error handling
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TaskQueue } from '../solutions/task-queue.js';

describe('TaskQueue', () => {
  let queue;

  beforeEach(() => {
    queue = new TaskQueue(2); // Max 2 concurrent
  });

  describe('Basic functionality', () => {
    it('should create a queue with specified concurrency', () => {
      const q = new TaskQueue(5);
      expect(q.concurrency).toBe(5);
    });

    it('should add tasks to the queue', () => {
      queue.addTask(async () => 'test');
      expect(queue.tasks.length).toBe(1);
    });

    it('should process a single task', async () => {
      const task = vi.fn(async () => 'result');
      queue.addTask(task);

      await queue.run();

      expect(task).toHaveBeenCalled();
    });

    it('should return task results', async () => {
      queue.addTask(async () => 'result1');
      queue.addTask(async () => 'result2');

      const results = await queue.run();

      expect(results).toHaveLength(2);
      expect(results[0].result).toBe('result1');
      expect(results[1].result).toBe('result2');
    });
  });

  describe('Concurrency control', () => {
    it('should respect concurrency limit', async () => {
      let concurrentCount = 0;
      let maxConcurrent = 0;

      const createTask = () => async () => {
        concurrentCount++;
        maxConcurrent = Math.max(maxConcurrent, concurrentCount);
        await new Promise(resolve => setTimeout(resolve, 100));
        concurrentCount--;
      };

      // Add 5 tasks
      for (let i = 0; i < 5; i++) {
        queue.addTask(createTask());
      }

      await queue.run();

      expect(maxConcurrent).toBeLessThanOrEqual(2);
    });

    it('should process all tasks eventually', async () => {
      const taskCount = 10;
      const tasks = Array.from({ length: taskCount }, (_, i) =>
        async () => `task-${i}`
      );

      tasks.forEach(task => queue.addTask(task));

      const results = await queue.run();

      expect(results).toHaveLength(taskCount);
    });
  });

  describe('Event emission', () => {
    it('should emit taskStart event', async () => {
      const startHandler = vi.fn();
      queue.on('taskStart', startHandler);

      queue.addTask(async () => 'test');
      await queue.run();

      expect(startHandler).toHaveBeenCalledWith(1);
    });

    it('should emit taskComplete event', async () => {
      const completeHandler = vi.fn();
      queue.on('taskComplete', completeHandler);

      queue.addTask(async () => 'result');
      await queue.run();

      expect(completeHandler).toHaveBeenCalledWith(1, 'result');
    });

    it('should emit taskError event on failure', async () => {
      const errorHandler = vi.fn();
      queue.on('taskError', errorHandler);

      const error = new Error('Task failed');
      queue.addTask(async () => {
        throw error;
      });

      await queue.run();

      expect(errorHandler).toHaveBeenCalledWith(1, error);
    });

    it('should emit allComplete event', async () => {
      const completeHandler = vi.fn();
      queue.on('allComplete', completeHandler);

      queue.addTask(async () => 'test');
      await queue.run();

      expect(completeHandler).toHaveBeenCalledWith({
        total: 1,
        completed: 1,
        failed: 0
      });
    });
  });

  describe('Error handling', () => {
    it('should handle task errors without stopping queue', async () => {
      queue.addTask(async () => 'success1');
      queue.addTask(async () => {
        throw new Error('failure');
      });
      queue.addTask(async () => 'success2');

      const results = await queue.run();

      expect(results).toHaveLength(3);
      expect(results[0].status).toBe('completed');
      expect(results[1].status).toBe('failed');
      expect(results[2].status).toBe('completed');
    });

    it('should track failed tasks', async () => {
      queue.addTask(async () => {
        throw new Error('fail');
      });

      await queue.run();

      expect(queue.failed).toBe(1);
      expect(queue.completed).toBe(0);
    });

    it('should track completed tasks', async () => {
      queue.addTask(async () => 'success');
      queue.addTask(async () => 'success');

      await queue.run();

      expect(queue.completed).toBe(2);
      expect(queue.failed).toBe(0);
    });
  });

  describe('Edge cases', () => {
    it('should handle empty queue', async () => {
      const results = await queue.run();
      expect(results).toHaveLength(0);
    });

    it('should handle queue with concurrency 1', async () => {
      const singleQueue = new TaskQueue(1);
      singleQueue.addTask(async () => '1');
      singleQueue.addTask(async () => '2');

      const results = await singleQueue.run();

      expect(results).toHaveLength(2);
    });

    it('should handle tasks that resolve immediately', async () => {
      queue.addTask(async () => 'immediate');

      const results = await queue.run();

      expect(results[0].result).toBe('immediate');
    });

    it('should provide accurate stats', () => {
      queue.addTask(async () => 'test');

      const stats = queue.getStats();

      expect(stats.pending).toBe(1);
      expect(stats.running).toBe(0);
      expect(stats.completed).toBe(0);
      expect(stats.failed).toBe(0);
    });
  });
});

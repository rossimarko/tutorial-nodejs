/**
 * Module 7 Example 2: Mocking with Vitest
 * Demonstrates: vi.fn(), vi.mock(), spies
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock a database module
vi.mock('./fake-database.js', () => ({
  query: vi.fn(),
  connect: vi.fn(),
  disconnect: vi.fn()
}));

import * as db from './fake-database.js';

describe('Mocking Examples', () => {
  beforeEach(() => {
    // Clear mock history before each test
    vi.clearAllMocks();
  });

  describe('Mock Functions', () => {
    it('should track function calls', () => {
      const mockFn = vi.fn();

      mockFn('hello');
      mockFn('world');

      expect(mockFn).toHaveBeenCalledTimes(2);
      expect(mockFn).toHaveBeenCalledWith('hello');
      expect(mockFn).toHaveBeenCalledWith('world');
    });

    it('should return mocked values', () => {
      const mockFn = vi.fn();

      mockFn.mockReturnValue(42);
      expect(mockFn()).toBe(42);

      mockFn.mockReturnValue('different value');
      expect(mockFn()).toBe('different value');
    });

    it('should mock resolved values', async () => {
      const mockAsync = vi.fn();

      mockAsync.mockResolvedValue({ data: 'test' });

      const result = await mockAsync();
      expect(result.data).toBe('test');
    });

    it('should mock rejected values', async () => {
      const mockAsync = vi.fn();

      mockAsync.mockRejectedValue(new Error('Failed'));

      await expect(mockAsync()).rejects.toThrow('Failed');
    });
  });

  describe('Module Mocking', () => {
    it('should mock database query', async () => {
      db.query.mockResolvedValue({ rows: [{ id: 1, name: 'Test' }] });

      const result = await db.query('SELECT * FROM users');

      expect(db.query).toHaveBeenCalledWith('SELECT * FROM users');
      expect(result.rows).toHaveLength(1);
      expect(result.rows[0].name).toBe('Test');
    });

    it('should mock database connection', async () => {
      db.connect.mockResolvedValue(true);

      const connected = await db.connect();

      expect(db.connect).toHaveBeenCalled();
      expect(connected).toBe(true);
    });
  });

  describe('Spies', () => {
    it('should spy on object methods', () => {
      const calculator = {
        add: (a, b) => a + b
      };

      const addSpy = vi.spyOn(calculator, 'add');

      const result = calculator.add(2, 3);

      expect(addSpy).toHaveBeenCalledWith(2, 3);
      expect(result).toBe(5);
    });
  });

  describe('Mock Implementation', () => {
    it('should provide custom implementation', () => {
      const mockFn = vi.fn((x) => x * 2);

      expect(mockFn(5)).toBe(10);
      expect(mockFn(3)).toBe(6);
      expect(mockFn).toHaveBeenCalledTimes(2);
    });
  });
});

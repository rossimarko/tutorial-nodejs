/**
 * Tests for basic testing patterns
 * Demonstrates: describe, it, expect, async tests
 */

import { describe, it, expect } from 'vitest';
import { add, average, fetchUser, filterActiveUsers } from './01-basic-testing.js';

describe('Basic Testing Examples', () => {
  describe('add', () => {
    it('should add two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    it('should add negative numbers', () => {
      expect(add(-2, -3)).toBe(-5);
    });

    it('should add zero', () => {
      expect(add(5, 0)).toBe(5);
    });
  });

  describe('average', () => {
    it('should calculate average of numbers', () => {
      expect(average([1, 2, 3, 4, 5])).toBe(3);
    });

    it('should handle single number', () => {
      expect(average([10])).toBe(10);
    });

    it('should throw error for empty array', () => {
      expect(() => average([])).toThrow('Input must be a non-empty array');
    });

    it('should throw error for non-array', () => {
      expect(() => average('not an array')).toThrow();
    });
  });

  describe('fetchUser (async)', () => {
    it('should fetch user by id', async () => {
      const user = await fetchUser(1);

      expect(user).toBeDefined();
      expect(user.id).toBe(1);
      expect(user.name).toBe('User 1');
      expect(user.email).toBe('user1@example.com');
    });

    it('should throw error for invalid id', async () => {
      await expect(fetchUser(0)).rejects.toThrow('Invalid user ID');
    });
  });

  describe('filterActiveUsers', () => {
    const users = [
      { id: 1, name: 'Alice', active: true },
      { id: 2, name: 'Bob', active: false },
      { id: 3, name: 'Charlie', active: true }
    ];

    it('should filter only active users', () => {
      const active = filterActiveUsers(users);

      expect(active).toHaveLength(2);
      expect(active[0].name).toBe('Alice');
      expect(active[1].name).toBe('Charlie');
    });

    it('should return empty array when no active users', () => {
      const inactiveUsers = [{ id: 1, active: false }];
      const result = filterActiveUsers(inactiveUsers);

      expect(result).toHaveLength(0);
    });
  });
});

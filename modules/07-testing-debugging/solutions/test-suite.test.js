/**
 * Solution: Comprehensive Test Suite for UserService
 * Demonstrates: Complete test coverage, mocking, edge cases
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserService } from '../exercises/test-suite.js';

describe('UserService', () => {
  let userService;
  let mockDb;

  beforeEach(() => {
    // Create mock database
    mockDb = {
      query: vi.fn()
    };

    userService = new UserService(mockDb);
  });

  describe('getUser', () => {
    it('should get user by id', async () => {
      const mockUser = { id: 1, name: 'Alice', email: 'alice@example.com' };
      mockDb.query.mockResolvedValue({ rows: [mockUser] });

      const user = await userService.getUser(1);

      expect(mockDb.query).toHaveBeenCalledWith(
        'SELECT * FROM users WHERE id = $1',
        [1]
      );
      expect(user).toEqual(mockUser);
    });

    it('should throw error for invalid id', async () => {
      await expect(userService.getUser(0)).rejects.toThrow('Invalid user ID');
      await expect(userService.getUser(-1)).rejects.toThrow('Invalid user ID');
      await expect(userService.getUser(null)).rejects.toThrow('Invalid user ID');
    });

    it('should throw error when user not found', async () => {
      mockDb.query.mockResolvedValue({ rows: [] });

      await expect(userService.getUser(999)).rejects.toThrow('User not found');
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData = { name: 'Bob', email: 'bob@example.com' };
      const createdUser = { id: 2, ...userData };

      mockDb.query.mockResolvedValue({ rows: [createdUser] });

      const result = await userService.createUser(userData);

      expect(mockDb.query).toHaveBeenCalledWith(
        'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
        ['Bob', 'bob@example.com']
      );
      expect(result).toEqual(createdUser);
    });

    it('should throw error for missing name', async () => {
      await expect(
        userService.createUser({ email: 'test@example.com' })
      ).rejects.toThrow('Name and email are required');
    });

    it('should throw error for missing email', async () => {
      await expect(
        userService.createUser({ name: 'Test' })
      ).rejects.toThrow('Name and email are required');
    });

    it('should throw error for invalid email', async () => {
      await expect(
        userService.createUser({ name: 'Test', email: 'invalid-email' })
      ).rejects.toThrow('Invalid email format');
    });
  });

  describe('updateUser', () => {
    it('should update user', async () => {
      const existingUser = { id: 1, name: 'Alice', email: 'alice@example.com' };
      const updatedUser = { id: 1, name: 'Alice Updated', email: 'alice@example.com' };

      mockDb.query
        .mockResolvedValueOnce({ rows: [existingUser] }) // getUser call
        .mockResolvedValueOnce({ rows: [updatedUser] }); // update call

      const result = await userService.updateUser(1, { name: 'Alice Updated' });

      expect(result).toEqual(updatedUser);
    });

    it('should throw error for non-existent user', async () => {
      mockDb.query.mockResolvedValue({ rows: [] });

      await expect(
        userService.updateUser(999, { name: 'Test' })
      ).rejects.toThrow('User not found');
    });

    it('should throw error for invalid email in update', async () => {
      const existingUser = { id: 1, name: 'Alice', email: 'alice@example.com' };
      mockDb.query.mockResolvedValue({ rows: [existingUser] });

      await expect(
        userService.updateUser(1, { email: 'invalid-email' })
      ).rejects.toThrow('Invalid email format');
    });
  });

  describe('isValidEmail', () => {
    it('should validate correct emails', () => {
      expect(userService.isValidEmail('test@example.com')).toBe(true);
      expect(userService.isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(userService.isValidEmail('test+tag@example.com')).toBe(true);
    });

    it('should reject invalid emails', () => {
      expect(userService.isValidEmail('invalid')).toBe(false);
      expect(userService.isValidEmail('invalid@')).toBe(false);
      expect(userService.isValidEmail('@example.com')).toBe(false);
      expect(userService.isValidEmail('test@example')).toBe(false);
    });
  });
});

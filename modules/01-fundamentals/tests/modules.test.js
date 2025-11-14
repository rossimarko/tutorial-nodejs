/**
 * Tests for Module System
 * Demonstrates: Testing imports, module functionality
 */

import { describe, it, expect } from 'vitest';
import { add, subtract, multiply, divide, PI, E } from '../examples/helpers/math.js';
import { formatCurrency, formatDate, formatBytes } from '../examples/helpers/formatters.js';
import greet from '../examples/helpers/greeter.js';

describe('Math Module', () => {
  describe('add', () => {
    it('should add two positive numbers', () => {
      expect(add(5, 3)).toBe(8);
    });

    it('should add negative numbers', () => {
      expect(add(-5, -3)).toBe(-8);
    });

    it('should add mixed numbers', () => {
      expect(add(5, -3)).toBe(2);
    });
  });

  describe('subtract', () => {
    it('should subtract two numbers', () => {
      expect(subtract(10, 5)).toBe(5);
    });

    it('should handle negative results', () => {
      expect(subtract(5, 10)).toBe(-5);
    });
  });

  describe('multiply', () => {
    it('should multiply two numbers', () => {
      expect(multiply(5, 3)).toBe(15);
    });

    it('should handle multiplication by zero', () => {
      expect(multiply(5, 0)).toBe(0);
    });
  });

  describe('divide', () => {
    it('should divide two numbers', () => {
      expect(divide(10, 2)).toBe(5);
    });

    it('should throw error on division by zero', () => {
      expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
    });

    it('should handle decimal division', () => {
      expect(divide(10, 3)).toBeCloseTo(3.333, 2);
    });
  });

  describe('constants', () => {
    it('should export PI constant', () => {
      expect(PI).toBeCloseTo(3.14159, 4);
    });

    it('should export E constant', () => {
      expect(E).toBeCloseTo(2.71828, 4);
    });
  });
});

describe('Formatters Module', () => {
  describe('formatCurrency', () => {
    it('should format USD currency', () => {
      const result = formatCurrency(1234.56);
      expect(result).toBe('$1,234.56');
    });

    it('should handle zero', () => {
      const result = formatCurrency(0);
      expect(result).toBe('$0.00');
    });

    it('should format large numbers', () => {
      const result = formatCurrency(1000000);
      expect(result).toBe('$1,000,000.00');
    });
  });

  describe('formatDate', () => {
    it('should format a date', () => {
      const date = new Date('2024-01-15');
      const result = formatDate(date);
      expect(result).toContain('January');
      expect(result).toContain('15');
      expect(result).toContain('2024');
    });
  });

  describe('formatBytes', () => {
    it('should format 0 bytes', () => {
      expect(formatBytes(0)).toBe('0 Bytes');
    });

    it('should format bytes', () => {
      expect(formatBytes(1024)).toBe('1 KB');
    });

    it('should format kilobytes', () => {
      expect(formatBytes(1024 * 1024)).toBe('1 MB');
    });

    it('should format megabytes', () => {
      expect(formatBytes(1024 * 1024 * 1024)).toBe('1 GB');
    });

    it('should format with decimals', () => {
      expect(formatBytes(1536)).toBe('1.5 KB');
    });
  });
});

describe('Greeter Module', () => {
  describe('greet', () => {
    it('should return a greeting with name', () => {
      const result = greet('Alice');
      expect(result).toContain('Alice');
    });

    it('should include time-based greeting', () => {
      const result = greet('Bob');
      const validGreetings = ['Good morning', 'Good afternoon', 'Good evening'];
      const hasValidGreeting = validGreetings.some(greeting =>
        result.includes(greeting)
      );
      expect(hasValidGreeting).toBe(true);
    });

    it('should end with exclamation mark', () => {
      const result = greet('Charlie');
      expect(result).toMatch(/!$/);
    });
  });
});

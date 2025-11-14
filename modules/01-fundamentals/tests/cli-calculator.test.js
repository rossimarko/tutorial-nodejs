/**
 * Tests for CLI Calculator
 * Demonstrates: Vitest testing, process mocking, error handling
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to the solution calculator
const calculatorPath = join(__dirname, '../solutions/cli-calculator.js');

/**
 * Helper function to run calculator and get output
 * @param {string[]} args - Command-line arguments
 * @returns {Promise<{stdout: string, stderr: string, exitCode: number}>}
 */
function runCalculator(args) {
  return new Promise((resolve) => {
    const child = spawn('node', [calculatorPath, ...args]);

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (exitCode) => {
      resolve({ stdout, stderr, exitCode });
    });
  });
}

describe('CLI Calculator', () => {
  describe('Addition', () => {
    it('should add two positive numbers', async () => {
      const { stdout, exitCode } = await runCalculator(['add', '10', '5']);
      expect(stdout.trim()).toBe('Result: 15');
      expect(exitCode).toBe(0);
    });

    it('should add negative numbers', async () => {
      const { stdout, exitCode } = await runCalculator(['add', '-10', '-5']);
      expect(stdout.trim()).toBe('Result: -15');
      expect(exitCode).toBe(0);
    });

    it('should add decimal numbers', async () => {
      const { stdout, exitCode } = await runCalculator(['add', '10.5', '5.3']);
      expect(stdout.trim()).toBe('Result: 15.8');
      expect(exitCode).toBe(0);
    });
  });

  describe('Subtraction', () => {
    it('should subtract two numbers', async () => {
      const { stdout, exitCode } = await runCalculator(['subtract', '10', '5']);
      expect(stdout.trim()).toBe('Result: 5');
      expect(exitCode).toBe(0);
    });

    it('should handle negative results', async () => {
      const { stdout, exitCode } = await runCalculator(['subtract', '5', '10']);
      expect(stdout.trim()).toBe('Result: -5');
      expect(exitCode).toBe(0);
    });
  });

  describe('Multiplication', () => {
    it('should multiply two numbers', async () => {
      const { stdout, exitCode } = await runCalculator(['multiply', '10', '5']);
      expect(stdout.trim()).toBe('Result: 50');
      expect(exitCode).toBe(0);
    });

    it('should handle multiplication by zero', async () => {
      const { stdout, exitCode } = await runCalculator(['multiply', '10', '0']);
      expect(stdout.trim()).toBe('Result: 0');
      expect(exitCode).toBe(0);
    });
  });

  describe('Division', () => {
    it('should divide two numbers', async () => {
      const { stdout, exitCode } = await runCalculator(['divide', '10', '5']);
      expect(stdout.trim()).toBe('Result: 2');
      expect(exitCode).toBe(0);
    });

    it('should handle decimal division', async () => {
      const { stdout, exitCode } = await runCalculator(['divide', '10', '3']);
      const result = parseFloat(stdout.trim().split(': ')[1]);
      expect(result).toBeCloseTo(3.333, 2);
      expect(exitCode).toBe(0);
    });

    it('should error on division by zero', async () => {
      const { stderr, exitCode } = await runCalculator(['divide', '10', '0']);
      expect(stderr).toContain('Cannot divide by zero');
      expect(exitCode).toBe(1);
    });
  });

  describe('Error Handling', () => {
    it('should error on invalid operation', async () => {
      const { stderr, exitCode } = await runCalculator(['invalid', '10', '5']);
      expect(stderr).toContain('Invalid operation');
      expect(exitCode).toBe(1);
    });

    it('should error on missing arguments', async () => {
      const { stderr, exitCode } = await runCalculator(['add', '10']);
      expect(stderr).toContain('Not enough arguments');
      expect(exitCode).toBe(1);
    });

    it('should error on invalid numbers', async () => {
      const { stderr, exitCode } = await runCalculator(['add', 'abc', '5']);
      expect(stderr).toContain('Invalid numbers');
      expect(exitCode).toBe(1);
    });

    it('should error when no arguments provided', async () => {
      const { stderr, exitCode } = await runCalculator([]);
      expect(stderr).toContain('Not enough arguments');
      expect(exitCode).toBe(1);
    });
  });
});

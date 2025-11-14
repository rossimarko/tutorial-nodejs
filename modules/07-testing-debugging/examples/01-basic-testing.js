/**
 * Module 7 Example 1: Basic Testing Patterns
 * This file contains functions to be tested
 */

/**
 * Add two numbers
 */
export function add(a, b) {
  return a + b;
}

/**
 * Calculate average of array
 */
export function average(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new Error('Input must be a non-empty array');
  }
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

/**
 * Async function to fetch user
 */
export async function fetchUser(id) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 100));

  if (id <= 0) {
    throw new Error('Invalid user ID');
  }

  return {
    id,
    name: `User ${id}`,
    email: `user${id}@example.com`
  };
}

/**
 * Filter active users
 */
export function filterActiveUsers(users) {
  return users.filter(user => user.active);
}

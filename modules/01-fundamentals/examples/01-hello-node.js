/**
 * Module 1 Example 1: Hello Node.js
 * Demonstrates: Basic Node.js program, console methods
 */

// Different console methods
console.log('Hello, Node.js!');
console.log('Node version:', process.version);
console.log('Platform:', process.platform);

// Formatted output
const user = {
  name: 'Alice',
  age: 30,
  city: 'New York'
};

console.log('\nUser Information:');
console.table(user);

// Warning and error messages
console.warn('This is a warning message');
console.error('This is an error message (but doesn\'t stop execution)');

// Time measurement
console.time('operation');
let sum = 0;
for (let i = 0; i < 1000000; i++) {
  sum += i;
}
console.timeEnd('operation');
console.log('Sum:', sum);

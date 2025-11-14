/**
 * Module 1 Example 4: ES Modules
 * Demonstrates: Creating and importing modules
 */

// This is the main file that imports from helper modules
import { add, subtract, multiply, divide } from './helpers/math.js';
import { formatCurrency, formatDate } from './helpers/formatters.js';
import greet from './helpers/greeter.js';

console.log('=== ES Modules Demo ===\n');

// Using math functions
console.log('Math Operations:');
console.log('10 + 5 =', add(10, 5));
console.log('10 - 5 =', subtract(10, 5));
console.log('10 * 5 =', multiply(10, 5));
console.log('10 / 5 =', divide(10, 5));

// Using formatters
console.log('\nFormatting:');
console.log('Price:', formatCurrency(1234.56));
console.log('Date:', formatDate(new Date()));

// Using default export
console.log('\nGreeting:');
console.log(greet('Developer'));

// Dynamic imports (for lazy loading)
console.log('\nDynamic Import:');
const dynamicModule = await import('./helpers/math.js');
console.log('Dynamically imported add:', dynamicModule.add(100, 50));

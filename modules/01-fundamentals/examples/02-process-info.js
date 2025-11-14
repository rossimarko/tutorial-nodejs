/**
 * Module 1 Example 2: Process Information
 * Demonstrates: process object, argv, env, cwd
 */

console.log('=== Node.js Process Information ===\n');

// Process version and platform
console.log('Node Version:', process.version);
console.log('Platform:', process.platform);
console.log('Architecture:', process.arch);
console.log('Process ID:', process.pid);

// Current working directory
console.log('\nWorking Directory:', process.cwd());

// Command-line arguments
console.log('\nCommand-line Arguments:');
console.log('Full argv:', process.argv);
console.log('Script arguments:', process.argv.slice(2));

// Environment variables
console.log('\nEnvironment:');
console.log('NODE_ENV:', process.env.NODE_ENV || 'not set');
console.log('PATH exists:', !!process.env.PATH);

// Memory usage
console.log('\nMemory Usage:');
const usage = process.memoryUsage();
console.log(`Heap Used: ${(usage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
console.log(`Heap Total: ${(usage.heapTotal / 1024 / 1024).toFixed(2)} MB`);
console.log(`RSS: ${(usage.rss / 1024 / 1024).toFixed(2)} MB`);

// Uptime
console.log('\nProcess Uptime:', process.uptime().toFixed(2), 'seconds');

// Example: Exit with code
// Uncomment to test
// console.log('\nExiting with code 0...');
// process.exit(0);

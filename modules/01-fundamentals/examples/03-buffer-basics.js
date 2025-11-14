/**
 * Module 1 Example 3: Buffer Basics
 * Demonstrates: Buffer creation, manipulation, conversion
 */

console.log('=== Buffer Basics ===\n');

// Creating buffers
console.log('1. Creating Buffers:');

// From string
const buf1 = Buffer.from('Hello, Node.js!');
console.log('From string:', buf1);
console.log('Length:', buf1.length, 'bytes');

// Allocate empty buffer
const buf2 = Buffer.alloc(10);
console.log('Empty buffer (10 bytes):', buf2);

// Allocate unsafe (faster, but may contain old data)
const buf3 = Buffer.allocUnsafe(10);
buf3.fill(0); // Always fill unsafe buffers!
console.log('Unsafe buffer (filled with zeros):', buf3);

// Buffer operations
console.log('\n2. Buffer Operations:');

// Convert to string
const message = Buffer.from('Node.js');
console.log('Buffer to string:', message.toString());
console.log('Buffer to hex:', message.toString('hex'));
console.log('Buffer to base64:', message.toString('base64'));

// Write to buffer
const buf4 = Buffer.alloc(20);
buf4.write('Hello');
buf4.write(' World', 5); // Write at offset 5
console.log('Written buffer:', buf4.toString());

// Buffer slicing
console.log('\n3. Buffer Slicing:');
const original = Buffer.from('Hello World');
const slice = original.slice(0, 5);
console.log('Original:', original.toString());
console.log('Slice (0-5):', slice.toString());

// Modifying slice affects original (same memory)
slice[0] = 74; // 'J' in ASCII
console.log('After modifying slice:', original.toString());

// Buffer concatenation
console.log('\n4. Buffer Concatenation:');
const buf5 = Buffer.from('Hello ');
const buf6 = Buffer.from('World');
const combined = Buffer.concat([buf5, buf6]);
console.log('Combined:', combined.toString());

// Buffer comparison
console.log('\n5. Buffer Comparison:');
const bufA = Buffer.from('abc');
const bufB = Buffer.from('abc');
const bufC = Buffer.from('abd');

console.log('bufA equals bufB:', bufA.equals(bufB)); // true
console.log('bufA equals bufC:', bufA.equals(bufC)); // false
console.log('bufA compare bufC:', bufA.compare(bufC)); // -1 (less than)

// Practical example: Encoding/Decoding
console.log('\n6. Practical Example - Base64 Encoding:');
const data = 'Secret message';
const encoded = Buffer.from(data).toString('base64');
const decoded = Buffer.from(encoded, 'base64').toString('utf8');

console.log('Original:', data);
console.log('Encoded:', encoded);
console.log('Decoded:', decoded);

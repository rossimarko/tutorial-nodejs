/**
 * Module 3 Example 2: File Streams
 * Demonstrates: Readable, writable, and transform streams
 */

import { createReadStream, createWriteStream } from 'fs';
import { Transform } from 'stream';
import { pipeline } from 'stream/promises';

console.log('=== File Streams ===\n');

async function demonstrateStreams() {
  // 1. Reading with streams
  console.log('1. Reading with streams:');
  const readStream = createReadStream('./package.json', { encoding: 'utf8' });

  readStream.on('data', (chunk) => {
    console.log('Received chunk:', chunk.length, 'characters');
  });

  readStream.on('end', () => {
    console.log('Read stream complete\n');
  });

  // 2. Writing with streams
  setTimeout(() => {
    console.log('2. Writing with streams:');
    const writeStream = createWriteStream('./stream-output.txt');

    writeStream.write('Line 1\n');
    writeStream.write('Line 2\n');
    writeStream.write('Line 3\n');
    writeStream.end();

    writeStream.on('finish', () => {
      console.log('Write stream complete\n');
    });
  }, 1000);

  // 3. Transform stream (uppercase)
  setTimeout(async () => {
    console.log('3. Transform stream:');

    const upperCaseTransform = new Transform({
      transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
      }
    });

    await pipeline(
      createReadStream('./stream-output.txt'),
      upperCaseTransform,
      createWriteStream('./stream-output-upper.txt')
    );

    console.log('Transform complete');
  }, 2000);
}

demonstrateStreams().catch(console.error);

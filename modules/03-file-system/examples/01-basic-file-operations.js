/**
 * Module 3 Example 1: Basic File Operations
 * Demonstrates: Reading, writing, and manipulating files
 */

import { readFile, writeFile, appendFile, unlink, stat } from 'fs/promises';
import { existsSync } from 'fs';

console.log('=== Basic File Operations ===\n');

const testFile = './test-file.txt';

async function demonstrateFileOperations() {
  try {
    // 1. Write file
    console.log('1. Writing file...');
    await writeFile(testFile, 'Hello, Node.js!\n');
    console.log('File written successfully\n');

    // 2. Read file
    console.log('2. Reading file...');
    const content = await readFile(testFile, 'utf8');
    console.log('Content:', content);

    // 3. Append to file
    console.log('3. Appending to file...');
    await appendFile(testFile, 'Additional line\n');
    const updatedContent = await readFile(testFile, 'utf8');
    console.log('Updated content:', updatedContent);

    // 4. Get file stats
    console.log('4. File stats:');
    const stats = await stat(testFile);
    console.log('Size:', stats.size, 'bytes');
    console.log('Created:', stats.birthtime);
    console.log('Modified:', stats.mtime);
    console.log('Is file:', stats.isFile());
    console.log('Is directory:', stats.isDirectory());

    // 5. Check file existence
    console.log('\n5. File existence:');
    console.log('File exists:', existsSync(testFile));

    // 6. Delete file
    console.log('\n6. Deleting file...');
    await unlink(testFile);
    console.log('File deleted');
    console.log('File exists after delete:', existsSync(testFile));

  } catch (err) {
    console.error('Error:', err.message);
  }
}

demonstrateFileOperations();

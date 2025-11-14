/**
 * Exercise: File Backup Tool
 * Difficulty: Medium
 *
 * Create a file backup tool that:
 * - Copies files with progress tracking
 * - Uses streams for large files
 * - Shows progress percentage
 * - Handles errors gracefully
 *
 * TODO:
 * 1. Implement copyFile function using streams
 * 2. Track progress and emit events
 * 3. Calculate and display percentage
 * 4. Handle errors
 */

import { EventEmitter } from 'events';
import { createReadStream, createWriteStream } from 'fs';
import { stat } from 'fs/promises';

class FileBackup extends EventEmitter {
  async backup(sourcePath, destPath) {
    // TODO: Implement backup with progress
  }
}

console.log('File Backup Tool - TODO: Implement me!');

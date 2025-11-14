/**
 * Solution: File Backup Tool
 * Complete implementation with progress tracking
 */

import { EventEmitter } from 'events';
import { createReadStream, createWriteStream } from 'fs';
import { stat } from 'fs/promises';
import { pipeline } from 'stream/promises';

class FileBackup extends EventEmitter {
  async backup(sourcePath, destPath) {
    try {
      const stats = await stat(sourcePath);
      const totalSize = stats.size;
      let copiedSize = 0;

      this.emit('start', { totalSize });

      const readStream = createReadStream(sourcePath);
      const writeStream = createWriteStream(destPath);

      readStream.on('data', (chunk) => {
        copiedSize += chunk.length;
        const progress = Math.round((copiedSize / totalSize) * 100);
        this.emit('progress', { copiedSize, totalSize, progress });
      });

      await pipeline(readStream, writeStream);

      this.emit('complete', { totalSize });
    } catch (err) {
      this.emit('error', err);
      throw err;
    }
  }
}

// Demo
async function demo() {
  const backup = new FileBackup();

  backup.on('start', ({ totalSize }) => {
    console.log(`Starting backup (${totalSize} bytes)...`);
  });

  backup.on('progress', ({ progress }) => {
    process.stdout.write(`\rProgress: ${progress}%`);
  });

  backup.on('complete', () => {
    console.log('\nBackup complete!');
  });

  backup.on('error', (err) => {
    console.error('Error:', err.message);
  });

  await backup.backup('./package.json', './package-backup.json');
}

demo().catch(console.error);

export { FileBackup };

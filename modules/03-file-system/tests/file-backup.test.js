/**
 * Tests for File Backup Tool
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { FileBackup } from '../solutions/file-backup.js';
import { writeFile, readFile, unlink } from 'fs/promises';

describe('FileBackup', () => {
  const testSource = './test-source.txt';
  const testDest = './test-dest.txt';
  let backup;

  beforeEach(() => {
    backup = new FileBackup();
  });

  afterEach(async () => {
    try {
      await unlink(testSource);
      await unlink(testDest);
    } catch (err) {
      // Ignore errors
    }
  });

  it('should copy a file', async () => {
    await writeFile(testSource, 'Test content');

    await backup.backup(testSource, testDest);

    const content = await readFile(testDest, 'utf8');
    expect(content).toBe('Test content');
  });

  it('should emit progress events', async () => {
    const progressEvents = [];

    await writeFile(testSource, 'Test content for progress tracking');

    backup.on('progress', (data) => {
      progressEvents.push(data.progress);
    });

    await backup.backup(testSource, testDest);

    expect(progressEvents.length).toBeGreaterThan(0);
    expect(progressEvents[progressEvents.length - 1]).toBe(100);
  });

  it('should emit start and complete events', async () => {
    let startEmitted = false;
    let completeEmitted = false;

    await writeFile(testSource, 'Test');

    backup.on('start', () => {
      startEmitted = true;
    });

    backup.on('complete', () => {
      completeEmitted = true;
    });

    await backup.backup(testSource, testDest);

    expect(startEmitted).toBe(true);
    expect(completeEmitted).toBe(true);
  });
});

# Module 3: File System Operations

## Learning Objectives

- Work with files using the `fs/promises` API
- Understand and use streams for efficient I/O
- Manipulate buffers for binary data
- Use path utilities for cross-platform compatibility
- Implement file watching and directory operations

## Theory

### File System API

Node.js provides three ways to interact with the file system:
1. **Callback-based** (legacy): `fs.readFile(path, callback)`
2. **Synchronous** (blocking): `fs.readFileSync(path)`
3. **Promise-based** (recommended): `fs.promises.readFile(path)`

### Streams

Streams are efficient for working with large files:
- **Readable**: Read data chunk by chunk
- **Writable**: Write data incrementally
- **Transform**: Modify data as it passes through
- **Duplex**: Both readable and writable

## Key Concepts

### Reading Files
```javascript
import { readFile } from 'fs/promises';
const content = await readFile('file.txt', 'utf8');
```

### Writing Files
```javascript
import { writeFile } from 'fs/promises';
await writeFile('file.txt', 'content');
```

### Streams
```javascript
import { createReadStream } from 'fs';
const stream = createReadStream('large-file.txt');
stream.on('data', chunk => process(chunk));
```

## Practice Exercises

- **exercises/file-backup.js** - Create a file backup tool with progress tracking

## Resources

- [Node.js fs/promises](https://nodejs.org/api/fs.html#promises-api)
- [Node.js Streams](https://nodejs.org/api/stream.html)

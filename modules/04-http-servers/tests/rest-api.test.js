/**
 * Tests for REST API
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { server, todos } from '../solutions/rest-api.js';

describe('REST API', () => {
  beforeAll(() => {
    // Server is already running from import
  });

  afterAll(() => {
    server.close();
  });

  it('should get all todos', async () => {
    const res = await fetch('http://localhost:3002/todos');
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
  });

  it('should create a todo', async () => {
    const res = await fetch('http://localhost:3002/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Test todo' })
    });

    expect(res.status).toBe(201);
    const todo = await res.json();
    expect(todo.title).toBe('Test todo');
    expect(todo.completed).toBe(false);
  });

  it('should get a single todo', async () => {
    const res = await fetch('http://localhost:3002/todos/1');
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.id).toBe(1);
  });

  it('should return 404 for non-existent todo', async () => {
    const res = await fetch('http://localhost:3002/todos/9999');
    expect(res.status).toBe(404);
  });
});

/**
 * Tests for Express Todo API
 */

import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { app, server, todos } from '../solutions/todo-api.js';

const BASE_URL = 'http://localhost:3005';

describe('Express Todo API', () => {
  beforeAll(() => {
    // Server already running from import
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(() => {
    // Reset todos
    todos.length = 0;
    todos.push(
      { id: 1, title: 'Test todo', completed: false, createdAt: new Date() }
    );
  });

  describe('GET /api/todos', () => {
    it('should return all todos', async () => {
      const res = await fetch(`${BASE_URL}/api/todos`);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.todos).toHaveLength(1);
      expect(data.count).toBe(1);
    });

    it('should filter by completed status', async () => {
      todos.push({ id: 2, title: 'Done', completed: true, createdAt: new Date() });

      const res = await fetch(`${BASE_URL}/api/todos?completed=true`);
      const data = await res.json();

      expect(data.todos).toHaveLength(1);
      expect(data.todos[0].completed).toBe(true);
    });
  });

  describe('POST /api/todos', () => {
    it('should create a new todo', async () => {
      const res = await fetch(`${BASE_URL}/api/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'New todo' })
      });

      const data = await res.json();

      expect(res.status).toBe(201);
      expect(data.title).toBe('New todo');
      expect(data.completed).toBe(false);
      expect(data.id).toBeDefined();
    });

    it('should reject empty title', async () => {
      const res = await fetch(`${BASE_URL}/api/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: '' })
      });

      expect(res.status).toBe(400);
    });
  });

  describe('PUT /api/todos/:id', () => {
    it('should update a todo', async () => {
      const res = await fetch(`${BASE_URL}/api/todos/1`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: true })
      });

      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.completed).toBe(true);
    });

    it('should return 404 for non-existent todo', async () => {
      const res = await fetch(`${BASE_URL}/api/todos/9999`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: true })
      });

      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/todos/:id', () => {
    it('should delete a todo', async () => {
      const res = await fetch(`${BASE_URL}/api/todos/1`, {
        method: 'DELETE'
      });

      expect(res.status).toBe(204);
      expect(todos).toHaveLength(0);
    });
  });
});

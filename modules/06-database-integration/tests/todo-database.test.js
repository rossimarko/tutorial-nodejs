/**
 * Tests for Todo Database
 * Note: Requires PostgreSQL to be running
 */

import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import {
  initDatabase,
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  closeDatabase,
  pool
} from '../solutions/todo-database.js';

describe('Todo Database', () => {
  beforeAll(async () => {
    // Initialize schema
    try {
      await initDatabase();
    } catch (err) {
      console.log('Note: Database tests require PostgreSQL to be running');
      throw err;
    }
  });

  afterAll(async () => {
    // Clean up
    await pool.query('DROP TABLE IF EXISTS todos');
    await closeDatabase();
  });

  beforeEach(async () => {
    // Clear todos before each test
    await pool.query('DELETE FROM todos');
  });

  it('should create a todo', async () => {
    const todo = await createTodo('Test todo');

    expect(todo).toBeDefined();
    expect(todo.title).toBe('Test todo');
    expect(todo.completed).toBe(false);
    expect(todo.id).toBeDefined();
  });

  it('should get all todos', async () => {
    await createTodo('Todo 1');
    await createTodo('Todo 2');

    const todos = await getAllTodos();

    expect(todos).toHaveLength(2);
  });

  it('should get todo by id', async () => {
    const created = await createTodo('Find me');
    const found = await getTodoById(created.id);

    expect(found.title).toBe('Find me');
    expect(found.id).toBe(created.id);
  });

  it('should update a todo', async () => {
    const todo = await createTodo('Original');
    const updated = await updateTodo(todo.id, {
      title: 'Updated',
      completed: true
    });

    expect(updated.title).toBe('Updated');
    expect(updated.completed).toBe(true);
  });

  it('should delete a todo', async () => {
    const todo = await createTodo('Delete me');
    const deleted = await deleteTodo(todo.id);

    expect(deleted.id).toBe(todo.id);

    const found = await getTodoById(todo.id);
    expect(found).toBeUndefined();
  });
});

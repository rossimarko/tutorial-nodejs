/**
 * Solution: Todo Database Integration
 * Complete database layer with CRUD operations
 */

import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'nodejs_tutorial',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password'
});

/**
 * Initialize database schema
 */
export async function initDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      completed BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

/**
 * Get all todos
 */
export async function getAllTodos() {
  const result = await pool.query(
    'SELECT * FROM todos ORDER BY created_at DESC'
  );
  return result.rows;
}

/**
 * Get todo by ID
 */
export async function getTodoById(id) {
  const result = await pool.query(
    'SELECT * FROM todos WHERE id = $1',
    [id]
  );
  return result.rows[0];
}

/**
 * Create a new todo
 */
export async function createTodo(title) {
  const result = await pool.query(
    'INSERT INTO todos (title) VALUES ($1) RETURNING *',
    [title]
  );
  return result.rows[0];
}

/**
 * Update a todo
 */
export async function updateTodo(id, updates) {
  const { title, completed } = updates;
  const result = await pool.query(
    `UPDATE todos
     SET title = COALESCE($1, title),
         completed = COALESCE($2, completed),
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $3
     RETURNING *`,
    [title, completed, id]
  );
  return result.rows[0];
}

/**
 * Delete a todo
 */
export async function deleteTodo(id) {
  const result = await pool.query(
    'DELETE FROM todos WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
}

/**
 * Close database connection
 */
export async function closeDatabase() {
  await pool.end();
}

export { pool };

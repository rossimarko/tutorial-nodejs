/**
 * Exercise: Todo Database Integration
 * Difficulty: Medium
 *
 * Create a database layer for the todo application
 *
 * TODO:
 * 1. Create todos table schema
 * 2. Implement CRUD operations
 * 3. Use prepared statements
 * 4. Handle errors
 * 5. Export functions for use in API
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

// TODO: Implement database functions

export { pool };

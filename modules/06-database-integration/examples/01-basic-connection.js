/**
 * Module 6 Example 1: Basic Database Connection
 * Demonstrates: Connecting to PostgreSQL, basic queries
 */

import pg from 'pg';
const { Pool } = pg;

// Database connection configuration
// In production, use environment variables
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'nodejs_tutorial',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password'
});

async function demonstrateConnection() {
  try {
    // Test connection
    console.log('Testing database connection...');
    const result = await pool.query('SELECT NOW()');
    console.log('Connected! Server time:', result.rows[0].now);

    // Create a simple table
    console.log('\nCreating users table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Table created successfully');

    // Insert data using prepared statement
    console.log('\nInserting user...');
    const insertResult = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      ['Alice', 'alice@example.com']
    );
    console.log('Inserted user:', insertResult.rows[0]);

    // Query data
    console.log('\nQuerying users...');
    const selectResult = await pool.query('SELECT * FROM users');
    console.log('Users:', selectResult.rows);

    // Clean up
    console.log('\nCleaning up...');
    await pool.query('DROP TABLE users');
    console.log('Table dropped');

  } catch (err) {
    console.error('Database error:', err.message);
  } finally {
    await pool.end();
  }
}

// Only run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  demonstrateConnection();
}

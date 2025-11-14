/**
 * Module 6 Example 2: Database Transactions
 * Demonstrates: Using transactions for atomic operations
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

async function transferMoney(fromAccountId, toAccountId, amount) {
  const client = await pool.connect();

  try {
    // Start transaction
    await client.query('BEGIN');

    // Deduct from sender
    const deductResult = await client.query(
      'UPDATE accounts SET balance = balance - $1 WHERE id = $2 RETURNING balance',
      [amount, fromAccountId]
    );

    if (deductResult.rows[0].balance < 0) {
      throw new Error('Insufficient funds');
    }

    // Add to receiver
    await client.query(
      'UPDATE accounts SET balance = balance + $1 WHERE id = $2',
      [amount, toAccountId]
    );

    // Commit transaction
    await client.query('COMMIT');
    console.log(`Transferred $${amount} from account ${fromAccountId} to ${toAccountId}`);

  } catch (err) {
    // Rollback on error
    await client.query('ROLLBACK');
    console.error('Transaction failed:', err.message);
    throw err;
  } finally {
    client.release();
  }
}

async function demonstrateTransactions() {
  try {
    // Create accounts table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS accounts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        balance DECIMAL(10, 2)
      )
    `);

    // Insert test accounts
    await pool.query('INSERT INTO accounts (name, balance) VALUES ($1, $2)', ['Alice', 1000]);
    await pool.query('INSERT INTO accounts (name, balance) VALUES ($1, $2)', ['Bob', 500]);

    // Transfer money
    await transferMoney(1, 2, 100);

    // Check balances
    const result = await pool.query('SELECT * FROM accounts');
    console.log('Final balances:', result.rows);

    // Clean up
    await pool.query('DROP TABLE accounts');

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await pool.end();
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  demonstrateTransactions();
}

export { transferMoney };

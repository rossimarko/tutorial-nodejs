# Module 6: Database Integration

## Learning Objectives

- Connect to PostgreSQL using the `pg` driver
- Implement connection pooling
- Use prepared statements to prevent SQL injection
- Handle database transactions
- Implement error handling for database operations
- Write testable database code

## Theory

### PostgreSQL with Node.js

The `pg` library is the most popular PostgreSQL client for Node.js.

### Connection Pooling

Pooling reuses database connections for better performance:

```javascript
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'mydb',
  user: 'postgres',
  password: 'password'
});
```

### Prepared Statements

Prevent SQL injection by using parameterized queries:

```javascript
// BAD: SQL injection vulnerable
const result = await pool.query(`SELECT * FROM users WHERE id = ${userId}`);

// GOOD: Uses prepared statement
const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
```

## Key Concepts

### Basic Query
```javascript
const result = await pool.query('SELECT * FROM users');
console.log(result.rows);
```

### Transactions
```javascript
const client = await pool.connect();
try {
  await client.query('BEGIN');
  await client.query('INSERT INTO users VALUES ($1, $2)', [id, name]);
  await client.query('INSERT INTO profiles VALUES ($1, $2)', [id, bio]);
  await client.query('COMMIT');
} catch (err) {
  await client.query('ROLLBACK');
  throw err;
} finally {
  client.release();
}
```

## Practice Exercises

- **exercises/todo-database.js** - Persist todos in PostgreSQL

## Resources

- [node-postgres Documentation](https://node-postgres.com/)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/)

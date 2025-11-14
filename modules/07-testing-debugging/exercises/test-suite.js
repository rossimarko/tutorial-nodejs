/**
 * Exercise: Complete Test Suite
 * Difficulty: Medium
 *
 * Write comprehensive tests for the UserService class
 * Achieve >80% code coverage
 *
 * TODO:
 * 1. Test all public methods
 * 2. Test error cases
 * 3. Mock the database
 * 4. Test async operations
 * 5. Achieve high coverage
 */

class UserService {
  constructor(database) {
    this.db = database;
  }

  async getUser(id) {
    if (!id || id <= 0) {
      throw new Error('Invalid user ID');
    }

    const result = await this.db.query('SELECT * FROM users WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      throw new Error('User not found');
    }

    return result.rows[0];
  }

  async createUser(userData) {
    const { name, email } = userData;

    if (!name || !email) {
      throw new Error('Name and email are required');
    }

    if (!this.isValidEmail(email)) {
      throw new Error('Invalid email format');
    }

    const result = await this.db.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );

    return result.rows[0];
  }

  async updateUser(id, updates) {
    const user = await this.getUser(id);

    if (updates.email && !this.isValidEmail(updates.email)) {
      throw new Error('Invalid email format');
    }

    const result = await this.db.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [updates.name || user.name, updates.email || user.email, id]
    );

    return result.rows[0];
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

export { UserService };

/**
 * Fake database module for mocking examples
 */

export async function query(sql) {
  // This would normally connect to a real database
  throw new Error('Should be mocked in tests');
}

export async function connect() {
  throw new Error('Should be mocked in tests');
}

export async function disconnect() {
  throw new Error('Should be mocked in tests');
}

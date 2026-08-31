import { initializeDatabase } from '../src/db/init';
import pool from '../src/db';

beforeAll(async () => {
  // Set test database environment variables if not already set
  process.env.DB_NAME = process.env.DB_NAME_TEST || 'book_api_test';
  // Ensure database exists (create it if needed) – optional
  // We'll assume the test DB is already created in CI and locally.
  await initializeDatabase();
});

afterAll(async () => {
  await pool.end();
});
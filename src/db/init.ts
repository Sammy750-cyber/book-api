import pool from '../db';

export const initializeDatabase = async (): Promise<void> => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS books (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      year INTEGER NOT NULL
    );
  `);

  const result = await pool.query('SELECT COUNT(*) FROM books');
  const count = parseInt(result.rows[0].count, 10);
  if (count === 0) {
    await pool.query(`
      INSERT INTO books (title, author, year) VALUES
        ('The Great Gatsby', 'F. Scott Fitzgerald', 1925),
        ('To Kill a Mockingbird', 'Harper Lee', 1960);
    `);
  }
};
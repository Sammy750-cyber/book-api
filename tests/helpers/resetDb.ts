import pool from '../../src/db';

export const resetDb = async () => {
  await pool.query('TRUNCATE books RESTART IDENTITY CASCADE');
  await pool.query(`
    INSERT INTO books (title, author, year) VALUES
      ('The Great Gatsby', 'F. Scott Fitzgerald', 1925),
      ('To Kill a Mockingbird', 'Harper Lee', 1960)
  `);
};
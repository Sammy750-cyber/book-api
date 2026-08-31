import pool from '../db';
import { Book } from '../types/book';

// // In-memory store
// let books: Book[] = [
//   { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
//   { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
// ];

// let nextId = 3;

export const getAllBooks = async (): Promise<Book[]> => {
   const result = await pool.query('SELECT * FROM books ORDER BY id');
  return result.rows;
};

export const getBookById = async (id: number): Promise<Book | undefined> => {
  const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
  return result.rows[0];
};

export const createBook = async(data: Omit<Book, 'id'>): Promise<Book> => {
  const {title, author, year} = data;
  const result = await pool.query(
    'INSERT INTO books (title, author, year) VALUES ($1, $2, $3) RETURNING *',
    [title, author, year]
  );
  return result.rows[0];
};

export const searchBook = async (query: string): Promise<Book[]> => {
  const lowerQuery = await query.toLowerCase();
  const result = await pool.query(
    `SELECT * FROM books 
     WHERE title ILIKE $1 OR author ILIKE $1`,
    [`%${lowerQuery}%`]
  );
  return result.rows;
};

export const updateBook = async (
  id: number,
  data: Partial<Omit<Book, 'id'>>
): Promise<Book | undefined> => {
  const fields = [];
  const values = [];
  let index = 1;

  if (data.title) {
    fields.push(`title = $${index++}`);
    values.push(data.title);
  }

  if (data.author) {
    fields.push(`author = $${index++}`);
    values.push(data.author);
  }
  if (data.year) {
    fields.push(`year = $${index++}`);
    values.push(data.year);
  }
  if (fields.length === 0) {
    return Promise.resolve(undefined);
  }
  values.push(id);
  const result = await pool.query(
    `UPDATE books SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`,
    values
  );
  return result.rows[0];
  
};

export const deleteBook = async (id: number): Promise<boolean> => {
  const result = await pool.query('DELETE FROM books WHERE id = $1', [id]);
  return (result.rowCount ?? 0) > 0;
};

// export const resetBooks = (): void => {
//   books = [
//     { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
//     { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
//   ];
//   nextId = 3;
// };
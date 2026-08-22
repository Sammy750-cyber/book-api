import { Book } from '../types/book';

// In-memory store
let books: Book[] = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
];

let nextId = 3;

export const getAllBooks = (): Book[] => {
  return books;
};

export const getBookById = (id: number): Book | undefined => {
  return books.find((book) => book.id === id);
};

export const createBook = (data: Omit<Book, 'id'>): Book => {
  const newBook: Book = {
    id: nextId++,
    ...data,
  };
  books.push(newBook);
  return newBook;
};

export const updateBook = (
  id: number,
  data: Partial<Omit<Book, 'id'>>
): Book | undefined => {
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) return undefined;

  const updatedBook: Book = {
    ...books[index],
    ...data,
    id,
  };
  books[index] = updatedBook;
  return updatedBook;
};

export const deleteBook = (id: number): boolean => {
  const initialLength = books.length;
  books = books.filter((book) => book.id !== id);
  return books.length !== initialLength;
};
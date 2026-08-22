import { Request, Response } from 'express';
import * as bookService from '../services/bookService';

export const getAllBooks = (_req: Request, res: Response) => {
  const books = bookService.getAllBooks();
  res.json(books);
};

export const getBookById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const book = bookService.getBookById(id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  return res.json(book);
};

export const createBook = (req: Request, res: Response) => {
  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const newBook = bookService.createBook({ title, author, year });
  return res.status(201).json(newBook);
};

export const updateBook = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { title, author, year } = req.body;
  const updatedBook = bookService.updateBook(id, { title, author, year });
  if (!updatedBook) {
    return res.status(404).json({ message: 'Book not found' });
  }
  return res.json(updatedBook);
};

export const deleteBook = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const deleted = bookService.deleteBook(id);
  if (!deleted) {
    return res.status(404).json({ message: 'Book not found' });
  }
  return res.status(204).send();
};
import { Request, Response } from 'express';
import * as bookService from '../services/bookService';

export const getAllBooks = async (_req: Request, res: Response) => {
  try {
    const books = await bookService.getAllBooks();
    return res.json(books);
  } catch (error) { 
    console.error('Error fetching books:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid book id' });
  }
  try {
    const book = await bookService.getBookById(id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  return res.json(book);
  } catch (error) {
    console.error(`Error fetching book with id ${id}:`, error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createBook = async (req: Request, res: Response) => {
  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    const newBook = await bookService.createBook({ title, author, year });
    return res.status(201).json(newBook);
  } catch (error) {
    console.error('Error creating book:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const searchBook = async (req: Request, res: Response) => {
  const query = req.query.q as string;
  try {
    if (!query) {
      return res.status(400).json({ message: 'Missing search query' });
    }
    const results = await bookService.searchBook(query);
    return res.json(results);
  } catch (error) {
    console.error('Error searching books:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { title, author, year } = req.body;
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid book id' });
  }
  try {
    const updatedBook = await bookService.updateBook(id, { title, author, year });
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.json(updatedBook);
  } catch (error) {
    console.error(`Error updating book with id ${id}:`, error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid book id' });
  }
  try {
    const deleted = bookService.deleteBook(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.status(204).send();
  } catch (error) {
    console.error(`Error deleting book with id ${id}:`, error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
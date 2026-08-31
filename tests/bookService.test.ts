import * as bookService from '../src/services/bookService';
import { resetDb } from './helpers/resetDB';

describe('Book Service', () => {
  beforeEach(async () => {
    await resetDb();
  });

  it('should get all books',async () => {
    const books = await bookService.getAllBooks();
    expect(books).toHaveLength(2);
  });

  it('should get a book by id', async () => {
    const book = await bookService.getBookById(1);
    expect(book).toBeDefined();
    expect(book?.title).toBe('The Great Gatsby');
  });

  it('should return undefined for non-existent id', async() => {
    const book = await bookService.getBookById(999);
    expect(book).toBeUndefined();
  });

  it('should create a new book',async () => {
    const newBookData = { title: '1984', author: 'George Orwell', year: 1949 };
    const newBook = await bookService.createBook(newBookData);
    expect(newBook.id).toBeDefined();
    expect(newBook.title).toBe('1984');
    const allBooks = await bookService.getAllBooks();
    expect(allBooks).toHaveLength(3);
  });

  it('should update an existing book', async () => {
    const updated = await bookService.updateBook(1, { year: 2020 });
    expect(updated).toBeDefined();
    expect(updated?.year).toBe(2020);
  });

  it('should return undefined when updating non-existent book',async () => {
    const updated = await bookService.updateBook(999, { title: 'No' });
    expect(updated).toBeUndefined();
  });

  it('should delete a book', async () => {
    const deleted = await bookService.deleteBook(2);
    expect(deleted).toBe(true);
    const allBooks = await bookService.getAllBooks();
    expect(allBooks).toHaveLength(1);
  });

  it('should return false when deleting non-existent book', async () => {
    const deleted = await bookService.deleteBook(999);
    expect(deleted).toBe(false);
  });
});
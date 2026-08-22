import * as bookService from '../src/services/bookService';
import { Book } from '../src/types/book';

describe('Book Service', () => {
  beforeEach(() => {
    // Reset in-memory data before each test
    // Note: This is a simple approach; for a real app you'd use a database or a proper reset.
    // We'll manipulate the service directly in the tests.
    // To ensure clean state, we can clear and re-add default books.
    // For simplicity, we'll not fully reset here, but be aware of side effects.
    // In a real project, use a test database or mock.
  });

  it('should get all books', () => {
    const books = bookService.getAllBooks();
    expect(books).toHaveLength(2);
  });

  it('should get a book by id', () => {
    const book = bookService.getBookById(1);
    expect(book).toBeDefined();
    expect(book?.title).toBe('The Great Gatsby');
  });

  it('should return undefined for non-existent id', () => {
    const book = bookService.getBookById(999);
    expect(book).toBeUndefined();
  });

  it('should create a new book', () => {
    const newBookData = { title: '1984', author: 'George Orwell', year: 1949 };
    const newBook = bookService.createBook(newBookData);
    expect(newBook.id).toBeDefined();
    expect(newBook.title).toBe('1984');
    const allBooks = bookService.getAllBooks();
    expect(allBooks).toHaveLength(3);
  });

  it('should update an existing book', () => {
    const updated = bookService.updateBook(1, { year: 2020 });
    expect(updated).toBeDefined();
    expect(updated?.year).toBe(2020);
  });

  it('should return undefined when updating non-existent book', () => {
    const updated = bookService.updateBook(999, { title: 'No' });
    expect(updated).toBeUndefined();
  });

  it('should delete a book', () => {
    const deleted = bookService.deleteBook(2);
    expect(deleted).toBe(true);
    const allBooks = bookService.getAllBooks();
    expect(allBooks).toHaveLength(1);
  });

  it('should return false when deleting non-existent book', () => {
    const deleted = bookService.deleteBook(999);
    expect(deleted).toBe(false);
  });
});
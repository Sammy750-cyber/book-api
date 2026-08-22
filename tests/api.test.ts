import request from 'supertest';
import app from '../src/app';

describe('Book API Endpoints', () => {
  it('GET /books should return all books', async () => {
    const response = await request(app).get('/books');
    expect(response.status).toBe(201);
    expect(response.body).toHaveLength(2);
  });

  it('GET /books/:id should return a single book', async () => {
    const response = await request(app).get('/books/1');
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('The Great Gatsby');
  });

  it('GET /books/:id should return 404 for missing book', async () => {
    const response = await request(app).get('/books/999');
    expect(response.status).toBe(404);
  });

  it('POST /books should create a new book', async () => {
    const newBook = { title: 'Brave New World', author: 'Aldous Huxley', year: 1932 };
    const response = await request(app).post('/books').send(newBook);
    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Brave New World');
  });

  it('POST /books should return 400 if fields missing', async () => {
    const response = await request(app).post('/books').send({ title: 'Missing Fields' });
    expect(response.status).toBe(400);
  });

  it('PUT /books/:id should update a book', async () => {
    const response = await request(app).put('/books/1').send({ year: 2021 });
    expect(response.status).toBe(200);
    expect(response.body.year).toBe(2021);
  });

  it('DELETE /books/:id should delete a book', async () => {
    const response = await request(app).delete('/books/2');
    expect(response.status).toBe(204);
  });
});
import express from 'express';
import bookRoutes from './routes/books';

const app = express();

app.use(express.json());
app.use('/books', bookRoutes);
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'UP' });
});

export default app;
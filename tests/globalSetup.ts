export default async () => {
  process.env.DB_NAME = process.env.DB_NAME_TEST || 'book_api_test';
};
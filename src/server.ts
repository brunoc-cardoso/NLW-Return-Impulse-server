import express, { Request, Response } from 'express';

const PORT = process.env.PORT || 3333;
const server = express();

server.use(express.json());

server.get('/users', (request: Request, response: Response) => {
  return response.send('Hello World');
});

server.listen(PORT, () => {
  console.log(`🔥 Server is running on port ${PORT}`);
});

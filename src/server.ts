import express, { Request, Response } from 'express';

import { prisma } from './config/prisma';

const PORT = process.env.PORT || 3333;
const server = express();

server.use(express.json());

server.post('/feedbacks', async (request: Request, response: Response) => {
  const { type, comment, screenshot } = request.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    },
  });

  return response.status(201).json({ data: feedback });
});

server.listen(PORT, () => {
  console.log(`🔥 Server is running on port ${PORT}`);
});

import cors from 'cors';
import express, { Request, Response } from 'express';

import { NodemailerMailAdapter } from '@/adapters/nodemailer/nodemailerMailAdapter';
import { PrismaFeedbacksRepository } from '@/repositories/prisma/PrismaFeedbacksRepository';
import { SubmitFeedbackUseCase } from '@/useCases/SubmitFeedbackUseCase';

const PORT = process.env.SERVER_PORT || 3333;
const server = express();

server.use(cors());
server.use(express.json());

server.post('/feedbacks', async (request: Request, response: Response) => {
  const { type, comment, screenshot } = request.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter,
  );

  await submitFeedbackUseCase.execute({ type, comment, screenshot });

  return response.status(201).send();
});

server.listen(PORT, () => {
  console.log(`🔥 Server is running on port ${PORT}`);
});

import express, { Request, Response } from 'express';

import { transport } from '@/config/mailtrap';
import { prisma } from '@/config/prisma';

const PORT = process.env.SERVER_PORT || 3333;
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

  await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: `Bruno Cardoso <${process.env.MAILTRAP_TO_EMAIL}>`,
    subject: 'Novo feedback',
    html: [
      '<div style="font-family sans-serif; font-size: 16px; color: #111;">',
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      '</div>',
    ].join('\n'),
  });

  return response.status(201).json({ data: feedback });
});

server.listen(PORT, () => {
  console.log(`🔥 Server is running on port ${PORT}`);
});

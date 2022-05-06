import { prisma } from '@/config/prisma';
import {
  FeedbacksCreateData,
  FeedbacksRepository,
} from '@/repositories/FeedbacksRepository';

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({ type, comment, screenshot }: FeedbacksCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    });
  }
}

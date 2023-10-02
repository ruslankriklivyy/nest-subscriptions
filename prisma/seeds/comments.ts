import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedComments() {
  try {
    await prisma.comment.create({
      data: { author_id: 1, post_id: 1, content: 'Some comment 1' },
    });
  } catch (error) {
    console.log('Seeding comments error: ', error);
  } finally {
    prisma.$disconnect();
  }
}

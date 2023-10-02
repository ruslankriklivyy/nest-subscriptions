import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedPosts() {
  try {
    await prisma.post.createMany({
      data: [
        { author_id: 2, content: 'Some post 1', is_published: true },
        { author_id: 2, content: 'Some post 2', is_published: false },
      ],
    });
  } catch (error) {
    console.log('Posts seeding error: ', error);
  } finally {
    prisma.$disconnect();
  }
}

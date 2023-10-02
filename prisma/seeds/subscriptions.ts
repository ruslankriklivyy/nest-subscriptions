import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedSubscriptions() {
  try {
    await prisma.subscription.createMany({
      data: [
        {
          name: 'Test 1',
          available_posts_count: 1,
          is_published: true,
          price: 10,
        },
        {
          name: 'Test 2',
          available_posts_count: 5,
          is_published: false,
          price: 99.9,
        },
      ],
    });
  } catch (error) {
    console.log('Error sending subscriptions: ', error);
  } finally {
    prisma.$disconnect();
  }
}

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedSubscriptionUser() {
  try {
    await prisma.subscriptionUser.updateMany({
      where: {
        user_id: 2,
        is_active: true,
      },
      data: {
        is_active: false,
      },
    });

    await prisma.subscriptionUser.upsert({
      where: {
        user_id_subscription_id: {
          user_id: 2,
          subscription_id: 1,
        },
      },
      update: {
        is_active: true,
      },
      create: {
        user_id: 2,
        subscription_id: 1,
        is_active: true,
      },
    });
  } catch (error) {
    console.log('Error seeding SubscriptionUser: ', error);
  } finally {
    prisma.$disconnect();
  }
}

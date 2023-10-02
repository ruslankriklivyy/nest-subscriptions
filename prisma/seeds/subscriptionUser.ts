import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedSubscriptionUser() {
  try {
    const currentDate = new Date();
    const oneMonthLater = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate(),
    );

    await prisma.subscriptionUser.updateMany({
      where: {
        user_id: 2,
        is_active: true,
      },
      data: {
        is_active: false,
        end_date: oneMonthLater,
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
        end_date: oneMonthLater,
      },
      create: {
        user_id: 2,
        subscription_id: 1,
        is_active: true,
        end_date: oneMonthLater,
      },
    });
  } catch (error) {
    console.log('Error seeding SubscriptionUser: ', error);
  } finally {
    prisma.$disconnect();
  }
}

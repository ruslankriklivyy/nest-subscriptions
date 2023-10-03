import { PrismaClient } from '@prisma/client';
import { oneMonthLater } from '../../src/helpers/get-one-month-later.helper';

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
        available_posts_count: 1,
        end_date: oneMonthLater,
      },
    });
  } catch (error) {
    console.log('Error seeding SubscriptionUser: ', error);
  } finally {
    prisma.$disconnect();
  }
}

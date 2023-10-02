import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedTransactions() {
  try {
    await prisma.transaction.createMany({
      data: [
        {
          user_id: 1,
          total: 10,
        },
        {
          user_id: 2,
          total: 99,
        },
      ],
    });
  } catch (error) {
    console.log('Seeding balances error: ', error);
  } finally {
    prisma.$disconnect();
  }
}

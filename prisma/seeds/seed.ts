import { seedRoles } from './roles';
import { seedUsers } from './users';
import { PrismaClient } from '@prisma/client';
import { seedSubscriptions } from './subscriptions';
import { seedSubscriptionUser } from './subscriptionUser';

const prisma = new PrismaClient();

async function main() {
  try {
    await seedRoles();
    await seedUsers();
    await seedSubscriptions();
    await seedSubscriptionUser();
  } catch (error) {
    console.log(error);
  } finally {
    console.log('Successfully seed');
    prisma.$disconnect();
  }
}

main();

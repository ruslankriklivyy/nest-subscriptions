import { seedRoles } from './roles';
import { seedUsers } from './users';
import { PrismaClient } from '@prisma/client';
import { seedSubscriptions } from './subscriptions';
import { seedSubscriptionUser } from './subscriptionUser';
import { seedPosts } from './posts';
import { seedComments } from './comments';
import { seedBalances } from './balances';
import { seedTransactions } from './transactions';

const prisma = new PrismaClient();

async function main() {
  try {
    await seedRoles();
    await seedUsers();
    await seedBalances();
    await seedTransactions();
    await seedSubscriptions();
    await seedSubscriptionUser();
    await seedPosts();
    await seedComments();
  } catch (error) {
    console.log(error);
  } finally {
    console.log('Successfully seed');
    prisma.$disconnect();
  }
}

main();

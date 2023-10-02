import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function seedUsers() {
  try {
    const password = await bcrypt.hash('12345678', 5);

    await prisma.user.createMany({
      data: [
        {
          email: 'admin@example.com',
          name: 'admin',
          role_id: 1,
          password: password,
        },
        {
          email: 'user@example.com',
          name: 'user',
          role_id: 2,
          password: password,
        },
      ],
    });
  } catch (error) {
    console.log('Error sending users: ', error);
  } finally {
    await prisma.$disconnect();
  }
}

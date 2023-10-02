import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateSubscriptionUserDto } from './dto/create-subscription-user.dto';
import { UpdateSubscriptionUserDto } from './dto/update-subscription-user.dto';

@Injectable()
export class SubscriptionUserService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.subscriptionUser.findMany();
  }

  getOne(userId: number, subscriptionId: number) {
    return this.prisma.subscriptionUser.findUnique({
      where: {
        user_id_subscription_id: {
          user_id: userId,
          subscription_id: subscriptionId,
        },
      },
      include: { subscription: true },
    });
  }

  async create(subscriptionUserDto: CreateSubscriptionUserDto) {
    await this.prisma.subscriptionUser.updateMany({
      where: { user_id: subscriptionUserDto.user_id, is_active: true },
      data: { is_active: false },
    });

    return this.prisma.subscriptionUser.create({ data: subscriptionUserDto });
  }

  async update(
    userId: number,
    subscriptionId: number,
    subscriptionUserDto: UpdateSubscriptionUserDto,
  ) {
    await this.prisma.subscriptionUser.updateMany({
      where: { user_id: userId, is_active: true },
      data: { is_active: false },
    });

    return this.prisma.subscriptionUser.update({
      where: {
        user_id_subscription_id: {
          user_id: userId,
          subscription_id: subscriptionId,
        },
      },
      data: subscriptionUserDto,
    });
  }

  delete(userId: number, subscriptionId: number) {
    return this.prisma.subscriptionUser.delete({
      where: {
        user_id_subscription_id: {
          user_id: userId,
          subscription_id: subscriptionId,
        },
      },
    });
  }
}

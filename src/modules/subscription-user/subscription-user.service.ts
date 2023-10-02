import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateSubscriptionUserDto } from './dto/create-subscription-user.dto';
import { UpdateSubscriptionUserDto } from './dto/update-subscription-user.dto';
import { Cron } from '@nestjs/schedule';
import { SubscriptionService } from '../subscription/subscription.service';
import { BalanceService } from '../balance/balance.service';

@Injectable()
export class SubscriptionUserService {
  constructor(
    private prisma: PrismaService,
    private subscriptionService: SubscriptionService,
    private balanceService: BalanceService,
  ) {}

  getAll() {
    return this.prisma.subscriptionUser.findMany({
      where: { deleted_at: null },
    });
  }

  getOne(userId: number, subscriptionId: number) {
    return this.prisma.subscriptionUser.findUnique({
      where: {
        user_id_subscription_id: {
          user_id: userId,
          subscription_id: subscriptionId,
        },
        deleted_at: null,
      },
      include: { subscription: true },
    });
  }

  async create(subscriptionUserDto: CreateSubscriptionUserDto) {
    const subscription = await this.subscriptionService.getOne(
      subscriptionUserDto.subscription_id,
    );
    const userBalance = await this.balanceService.getOne(
      subscriptionUserDto.user_id,
    );

    if (subscription.price > userBalance.total) {
      throw new HttpException('Not enough money', HttpStatus.BAD_REQUEST);
    }

    const currentDate = new Date();
    const oneMonthLater = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate(),
    );

    await this.prisma.subscriptionUser.updateMany({
      where: { user_id: subscriptionUserDto.user_id, is_active: true },
      data: { is_active: false, end_date: oneMonthLater },
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

  @Cron('0 0 * * * *')
  async handleCron() {
    const currentDate = new Date();

    await this.prisma.subscriptionUser.updateMany({
      where: { end_date: { lte: currentDate } },
      data: { deleted_at: currentDate },
    });
  }
}

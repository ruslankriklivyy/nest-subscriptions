import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateSubscriptionUserDto } from './dto/create-subscription-user.dto';
import { UpdateSubscriptionUserDto } from './dto/update-subscription-user.dto';
import { Cron } from '@nestjs/schedule';
import { SubscriptionService } from '../subscription/subscription.service';
import { BalanceService } from '../balance/balance.service';
import { oneMonthLater } from '../../helpers/get-one-month-later.helper';

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
    const subscriptionsUser = await this.prisma.subscriptionUser.findUnique({
      where: {
        user_id_subscription_id: {
          user_id: subscriptionUserDto.user_id,
          subscription_id: subscriptionUserDto.subscription_id,
        },
        end_date: { lte: oneMonthLater },
      },
    });

    if (subscriptionsUser) {
      throw new HttpException(
        'That subscription is already use',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (subscription.price > userBalance.total) {
      throw new HttpException('Not enough money', HttpStatus.BAD_REQUEST);
    }

    await this.balanceService.updateTotal(
      subscriptionUserDto.user_id,
      subscription.price,
      'decrement',
    );

    return this.prisma.subscriptionUser.create({
      data: {
        ...subscriptionUserDto,
        end_date: oneMonthLater,
        available_posts_count: subscription.available_posts_count,
      },
    });
  }

  async update(
    userId: number,
    subscriptionId: number,
    subscriptionUserDto: UpdateSubscriptionUserDto,
  ) {
    if (subscriptionUserDto.is_active) {
      await this.prisma.subscriptionUser.updateMany({
        where: { user_id: userId, is_active: true },
        data: { is_active: false },
      });
    }

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

  async getAvailablePostsCount(userId: number) {
    const subscriptionUser = await this.prisma.subscriptionUser.findFirst({
      where: { user_id: userId, is_active: true },
    });
    const activeSubscriptionUser = subscriptionUser.subscription_id;

    return {
      count: subscriptionUser.available_posts_count,
      subscriptionId: activeSubscriptionUser,
    };
  }

  updateAvailablePostsCount(
    userId: number,
    subscriptionId: number,
    count: number,
  ) {
    return this.prisma.subscriptionUser.update({
      where: {
        user_id_subscription_id: {
          user_id: userId,
          subscription_id: subscriptionId,
        },
      },
      data: { available_posts_count: count },
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

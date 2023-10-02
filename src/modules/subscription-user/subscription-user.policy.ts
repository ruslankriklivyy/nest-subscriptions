import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class SubscriptionUserPolicy implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user } = request;

    if (!user) {
      throw new HttpException(
        "You don't have permissions",
        HttpStatus.FORBIDDEN,
      );
    }

    const recordId = +request.params.id;

    if (isNaN(recordId)) {
      throw new HttpException(
        "You don't have permissions",
        HttpStatus.FORBIDDEN,
      );
    }

    const subscriptionUser = await this.prisma.subscriptionUser.findUnique({
      where: {
        user_id_subscription_id: {
          user_id: user?.id,
          subscription_id: recordId,
        },
      },
    });

    if (!subscriptionUser) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return true;
  }
}

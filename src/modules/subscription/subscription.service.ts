import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateAndUpdateSubscriptionDto } from './dto/create-subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.subscription.findMany();
  }

  getOne(id: number) {
    return this.prisma.subscription.findUnique({ where: { id } });
  }

  create(subscriptionDto: CreateAndUpdateSubscriptionDto) {
    return this.prisma.subscription.create({ data: subscriptionDto });
  }

  update(id: number, subscriptionDto: CreateAndUpdateSubscriptionDto) {
    return this.prisma.subscription.update({
      data: subscriptionDto,
      where: { id },
    });
  }

  delete(id: number) {
    return this.prisma.subscription.delete({ where: { id } });
  }
}

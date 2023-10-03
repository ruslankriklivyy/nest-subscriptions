import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateAndUpdateSubscriptionDto } from './dto/create-subscription.dto';
import { UserEntity } from '../user/user.entity';
import { ADMIN_ROLE } from '../auth/roles.guard';

@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}

  getAll(user: UserEntity) {
    let where = { is_published: true };

    if (user.role.slug === ADMIN_ROLE) {
      where = undefined;
    }

    return this.prisma.subscription.findMany({ where });
  }

  getAllPublished() {
    return this.prisma.subscription.findMany({ where: { is_published: true } });
  }

  getOne(id: number) {
    return this.prisma.subscription.findUnique({
      where: { id, is_published: true },
    });
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

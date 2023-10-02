import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateAndUpdateBalanceDto } from './dto/create-update-balance.dto';

@Injectable()
export class BalanceService {
  constructor(private prisma: PrismaService) {}

  getOne(id: number) {
    return this.prisma.balance.findUnique({ where: { id } });
  }

  create(userId: number, balanceDto: CreateAndUpdateBalanceDto) {
    return this.prisma.balance.create({
      data: { ...balanceDto, user_id: userId },
    });
  }

  async updateTotal(userId: number, total: number) {
    const balance = await this.prisma.balance.findUnique({
      where: { user_id: userId },
    });
    const balanceTotal = balance.total + total;

    return this.prisma.balance.update({
      where: { user_id: userId },
      data: { total: balanceTotal },
    });
  }
}

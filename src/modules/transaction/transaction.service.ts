import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateAndUpdateTransactionDto } from './dto/create-update-transaction.dto';
import { BalanceService } from '../balance/balance.service';

@Injectable()
export class TransactionService {
  constructor(
    private prisma: PrismaService,
    private balanceService: BalanceService,
  ) {}

  getAll() {
    return this.prisma.transaction.findMany();
  }

  getAllByUser(userId: number) {
    return this.prisma.transaction.findMany({ where: { user_id: userId } });
  }

  async create(userId: number, transactionDto: CreateAndUpdateTransactionDto) {
    console.log(transactionDto);
    const newTransaction = await this.prisma.transaction.create({
      data: { user_id: userId, ...transactionDto },
    });

    await this.balanceService.updateTotal(
      userId,
      transactionDto.total,
      'increment',
    );

    return newTransaction;
  }
}

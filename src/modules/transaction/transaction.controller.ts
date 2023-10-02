import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../../decorators/user.decorator';
import { CreateAndUpdateTransactionDto } from './dto/create-update-transaction.dto';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('/current-user')
  getAllByUser(@User() userId: number) {
    return this.transactionService.getAllByUser(userId);
  }

  @Post()
  create(
    @User() userId: number,
    transactionDto: CreateAndUpdateTransactionDto,
  ) {
    return this.transactionService.create(userId, transactionDto);
  }
}

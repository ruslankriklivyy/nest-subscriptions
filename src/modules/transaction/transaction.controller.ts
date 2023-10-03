import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../../decorators/user.decorator';
import { CreateAndUpdateTransactionDto } from './dto/create-update-transaction.dto';
import { UserEntity } from '../user/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Transaction')
@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('/current-user')
  getAllByUser(@User() user: UserEntity) {
    return this.transactionService.getAllByUser(user.id);
  }

  @Post()
  create(
    @User() user: UserEntity,
    @Body() transactionDto: CreateAndUpdateTransactionDto,
  ) {
    return this.transactionService.create(user.id, transactionDto);
  }
}

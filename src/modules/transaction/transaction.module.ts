import { forwardRef, Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../../prisma.service';
import { BalanceService } from '../balance/balance.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [TransactionController],
  providers: [TransactionService, PrismaService, BalanceService],
})
export class TransactionModule {}

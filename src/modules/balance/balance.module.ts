import { forwardRef, Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../../prisma.service';
import { TransactionService } from '../transaction/transaction.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [BalanceController],
  providers: [BalanceService, PrismaService, TransactionService],
})
export class BalanceModule {}

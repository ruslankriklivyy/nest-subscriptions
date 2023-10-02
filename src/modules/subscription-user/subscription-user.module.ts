import { forwardRef, Module } from '@nestjs/common';
import { SubscriptionUserService } from './subscription-user.service';
import { SubscriptionUserController } from './subscription-user.controller';
import { PrismaService } from '../../prisma.service';
import { AuthModule } from '../auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BalanceService } from '../balance/balance.service';
import { SubscriptionService } from '../subscription/subscription.service';
import { SubscriptionUserPolicy } from './subscription-user.policy';

@Module({
  imports: [forwardRef(() => AuthModule), ScheduleModule.forRoot()],
  controllers: [SubscriptionUserController],
  providers: [
    SubscriptionUserService,
    PrismaService,
    BalanceService,
    SubscriptionService,
    SubscriptionUserPolicy,
  ],
})
export class SubscriptionUserModule {}

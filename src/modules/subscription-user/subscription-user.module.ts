import { Module } from '@nestjs/common';
import { SubscriptionUserService } from './subscription-user.service';
import { SubscriptionUserController } from './subscription-user.controller';

@Module({
  controllers: [SubscriptionUserController],
  providers: [SubscriptionUserService]
})
export class SubscriptionUserModule {}

import { forwardRef, Module } from '@nestjs/common';
import { SubscriptionUserService } from './subscription-user.service';
import { SubscriptionUserController } from './subscription-user.controller';
import { PrismaService } from '../../prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [SubscriptionUserController],
  providers: [SubscriptionUserService, PrismaService],
})
export class SubscriptionUserModule {}

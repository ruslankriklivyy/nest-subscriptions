import { forwardRef, Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from '../../prisma.service';
import { AuthModule } from '../auth/auth.module';
import { SubscriptionUserService } from '../subscription-user/subscription-user.service';
import { SubscriptionService } from '../subscription/subscription.service';
import { BalanceService } from '../balance/balance.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [PostController],
  providers: [
    PostService,
    PrismaService,
    SubscriptionUserService,
    SubscriptionService,
    BalanceService,
  ],
})
export class PostModule {}

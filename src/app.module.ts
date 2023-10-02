import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaService } from './prisma.service';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { PostModule } from './modules/post/post.module';
import { CommentModule } from './modules/comment/comment.module';
import { SubscriptionUserModule } from './modules/subscription-user/subscription-user.module';
import { BalanceModule } from './modules/balance/balance.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    RoleModule,
    SubscriptionModule,
    PostModule,
    CommentModule,
    SubscriptionUserModule,
    BalanceModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

import {
  Controller,
  Get,
  Param,
  UseGuards,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { SubscriptionUserService } from './subscription-user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateSubscriptionUserDto } from './dto/create-subscription-user.dto';
import { UpdateSubscriptionUserDto } from './dto/update-subscription-user.dto';
import { User } from '../../decorators/user.decorator';
import { SubscriptionUserPolicy } from './subscription-user.policy';
import { UserEntity } from '../user/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User subscriptions')
@Controller('user-subscriptions')
export class SubscriptionUserController {
  constructor(
    private readonly subscriptionUserService: SubscriptionUserService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll() {
    return this.subscriptionUserService.getAll();
  }

  @Get('/:subscriptionId')
  @UseGuards(JwtAuthGuard)
  getOne(@Param() { subscriptionId }, @User() user: UserEntity) {
    return this.subscriptionUserService.getOne(user.id, Number(subscriptionId));
  }

  @Post('/:subscriptionId')
  @UseGuards(JwtAuthGuard)
  create(
    @Param() { subscriptionId },
    @Body() subscriptionUserDto: CreateSubscriptionUserDto,
    @User() user: UserEntity,
  ) {
    return this.subscriptionUserService.create({
      user_id: user.id,
      subscription_id: Number(subscriptionId),
      ...subscriptionUserDto,
    });
  }

  @Put('/:subscriptionId')
  @UseGuards(JwtAuthGuard, SubscriptionUserPolicy)
  update(
    @Param() { subscriptionId },
    @Body() subscriptionUserDto: UpdateSubscriptionUserDto,
    @User() user: UserEntity,
  ) {
    return this.subscriptionUserService.update(
      user.id,
      Number(subscriptionId),
      subscriptionUserDto,
    );
  }

  @Delete('/:subscriptionId')
  @UseGuards(JwtAuthGuard, SubscriptionUserPolicy)
  delete(@Param() { subscriptionId }, @User() user: UserEntity) {
    return this.subscriptionUserService.delete(user.id, Number(subscriptionId));
  }
}

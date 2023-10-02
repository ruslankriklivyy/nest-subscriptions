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

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  getOne(@Param() { id }, @User() userId: number) {
    return this.subscriptionUserService.getOne(userId, Number(id));
  }

  @Post('/:id')
  @UseGuards(JwtAuthGuard)
  create(
    @Param() { id },
    @Body() subscriptionUserDto: CreateSubscriptionUserDto,
    @User() userId: number,
  ) {
    return this.subscriptionUserService.create({
      user_id: userId,
      subscription_id: Number(id),
      ...subscriptionUserDto,
    });
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard, SubscriptionUserPolicy)
  update(
    @Param() { id },
    @Body() subscriptionUserDto: UpdateSubscriptionUserDto,
    @User() userId: number,
  ) {
    return this.subscriptionUserService.update(
      userId,
      Number(id),
      subscriptionUserDto,
    );
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard, SubscriptionUserPolicy)
  delete(@Param() { id }, @User() userId: number) {
    return this.subscriptionUserService.delete(userId, Number(id));
  }
}

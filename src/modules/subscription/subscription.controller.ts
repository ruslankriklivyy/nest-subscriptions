import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Post,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { CreateAndUpdateSubscriptionDto } from './dto/create-subscription.dto';
import { Roles } from '../auth/roles-auth.decorator';
import { User } from '../../decorators/user.decorator';
import { UserEntity } from '../user/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Subscription')
@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll(@User() user: UserEntity) {
    return this.subscriptionService.getAll(user);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  getOne(@Param() { id }) {
    return this.subscriptionService.getOne(id);
  }

  @Post()
  @Roles('Admin')
  @UseGuards(RolesGuard)
  create(@Body() subscriptionDto: CreateAndUpdateSubscriptionDto) {
    return this.subscriptionService.create(subscriptionDto);
  }

  @Put('/:id')
  @Roles('Admin')
  @UseGuards(RolesGuard)
  update(
    @Param() { id },
    @Body() subscriptionDto: CreateAndUpdateSubscriptionDto,
  ) {
    return this.subscriptionService.update(Number(id), subscriptionDto);
  }

  @Delete('/:id')
  @Roles('Admin')
  @UseGuards(RolesGuard)
  delete(@Param() { id }) {
    return this.subscriptionService.delete(Number(id));
  }
}

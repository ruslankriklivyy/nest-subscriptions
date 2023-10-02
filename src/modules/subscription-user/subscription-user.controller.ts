import { Controller } from '@nestjs/common';
import { SubscriptionUserService } from './subscription-user.service';

@Controller('subscription-user')
export class SubscriptionUserController {
  constructor(private readonly subscriptionUserService: SubscriptionUserService) {}
}

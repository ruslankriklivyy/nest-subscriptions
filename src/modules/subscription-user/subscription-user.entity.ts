import { SubscriptionUser } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class SubscriptionUserEntity implements SubscriptionUser {
  constructor(partial: Partial<SubscriptionUserEntity>) {
    Object.assign(this, partial);
  }
  @ApiProperty({ example: 1, description: 'Subscription id' })
  subscription_id: number;

  @ApiProperty({ example: 2, description: 'User id' })
  user_id: number;

  @ApiProperty({ example: false, description: 'Is active' })
  is_active: boolean;

  @ApiProperty({ example: 1, description: 'Available posts count' })
  available_posts_count: number;

  @ApiProperty()
  end_date: Date;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  deleted_at: Date;
}

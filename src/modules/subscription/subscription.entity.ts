import { Subscription } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class SubscriptionEntity implements Subscription {
  constructor(partial: Partial<SubscriptionEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ example: '1', description: 'ID' })
  id: number;

  @ApiProperty({ example: 'Admin', description: 'Role name' })
  name: string;

  @ApiProperty({ example: 99.99, description: 'Subscription price' })
  price: number;

  @ApiProperty({ example: 10, description: 'Available posts count' })
  available_posts_count: number;

  @ApiProperty({ example: false, description: 'Subscription published' })
  is_published: boolean;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}

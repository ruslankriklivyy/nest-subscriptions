import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateAndUpdateSubscriptionDto {
  @ApiProperty({ example: 'Test 1', description: 'Subscription name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 99.99, description: 'Subscription price' })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 1, description: 'Available posts count' })
  @IsNumber()
  available_posts_count: number;

  @ApiProperty({ example: true, description: 'Subscription published flag' })
  @IsBoolean()
  is_published: boolean;
}

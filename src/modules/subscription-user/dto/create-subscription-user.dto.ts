import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';

export class CreateSubscriptionUserDto {
  @ApiProperty()
  @IsBoolean()
  is_active: boolean;

  @ApiProperty()
  @IsNumber()
  user_id: number;

  @ApiProperty()
  @IsNumber()
  subscription_id: number;
}

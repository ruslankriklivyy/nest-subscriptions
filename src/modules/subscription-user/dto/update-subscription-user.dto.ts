import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateSubscriptionUserDto {
  @ApiProperty()
  @IsBoolean()
  is_active: boolean;
}

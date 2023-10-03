import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateAndUpdateBalanceDto {
  @IsNumber()
  @ApiProperty()
  total: number;
}

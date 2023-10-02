import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateAndUpdateTransactionDto {
  @ApiProperty()
  @IsNumber()
  total: number;
}

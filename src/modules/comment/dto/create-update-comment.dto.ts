import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAndUpdateCommentDto {
  @ApiProperty()
  @IsString()
  content: string;
}

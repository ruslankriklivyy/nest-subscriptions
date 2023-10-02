import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'E-mail' })
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'Ruslan', description: 'Name' })
  @IsString()
  name: string;

  @ApiProperty({ example: '12345678', description: 'Password' })
  @IsString()
  @Length(4, 16)
  readonly password: string;

  @ApiProperty({ example: 1, description: 'Role id' })
  @IsNumber()
  role_id: number;
}

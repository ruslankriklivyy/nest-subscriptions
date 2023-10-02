import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { RoleEntity } from '../role/role.entity';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ example: '1', description: 'ID' })
  id: number;

  @ApiProperty({ example: 'Ruslan', description: 'Name' })
  name: string;

  @ApiProperty({ example: 'ruslan@gmail.com', description: 'E-mail' })
  email: string;

  @Exclude()
  password: string;

  @ApiProperty()
  role_id: number;

  @ApiProperty()
  role: RoleEntity;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}

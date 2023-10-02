import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class RoleEntity implements Role {
  constructor(partial: Partial<RoleEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ example: '1', description: 'ID' })
  id: number;

  @ApiProperty({ example: 'Admin', description: 'Role name' })
  name: string;

  @ApiProperty({ example: 'admin', description: 'Role slug' })
  slug: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}

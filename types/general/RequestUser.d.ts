import { Request } from '@nestjs/core';
import { UserEntity } from '../../src/modules/user/user.entity';

export interface RequestUser extends Request {
  user?: UserEntity;
}

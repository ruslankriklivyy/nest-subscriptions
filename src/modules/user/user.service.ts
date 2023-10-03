import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { excludeFields } from '../../helpers/exclude-fields.helper';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { role: true, balance: true },
    });
    return excludeFields(user, ['password']);
  }

  create(userDto: CreateUserDto) {
    return this.prisma.user.create({
      data: userDto,
      include: { role: true },
    });
  }

  getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });
  }
}

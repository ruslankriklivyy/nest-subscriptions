import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { role: true, balance: true },
    });
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

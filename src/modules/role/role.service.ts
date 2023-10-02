import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  getById(id: number) {
    return this.prisma.role.findUnique({ where: { id } });
  }
}

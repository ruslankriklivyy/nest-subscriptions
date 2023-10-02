import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.post.findMany();
  }

  getOne(id: number, userId: number) {
    return this.prisma.post.findUnique({ where: { id, author_id: userId } });
  }

  create(userId: number, postDto: CreatePostDto) {
    return this.prisma.post.create({
      data: { author_id: userId, ...postDto },
      include: { author: true },
    });
  }

  update(id: number, userId: number, postDto: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id, author_id: userId },
      data: postDto,
    });
  }

  delete(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { SubscriptionUserService } from '../subscription-user/subscription-user.service';

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    private subscriptionUserService: SubscriptionUserService,
  ) {}

  getAll() {
    return this.prisma.post.findMany();
  }

  getOne(id: number, userId: number) {
    return this.prisma.post.findUnique({ where: { id, author_id: userId } });
  }

  async create(userId: number, postDto: CreatePostDto) {
    const { count, subscriptionId } =
      await this.subscriptionUserService.getAvailablePostsCount(userId);

    if (count <= 0) {
      throw new HttpException('Not enough posts count', HttpStatus.FORBIDDEN);
    }

    await this.subscriptionUserService.updateAvailablePostsCount(
      userId,
      subscriptionId,
      count - 1,
    );

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

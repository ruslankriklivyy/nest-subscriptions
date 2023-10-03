import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { SubscriptionUserService } from '../subscription-user/subscription-user.service';
import { PostQueryFilter } from '../../../types/queries/PostQueryFilter';
import { UserEntity } from '../user/user.entity';
import { ADMIN_ROLE } from '../auth/roles.guard';

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    private subscriptionUserService: SubscriptionUserService,
  ) {}

  getAll(query: PostQueryFilter, user: UserEntity) {
    const where = {};

    if (query?.filter?.author) {
      where['author'] = { name: { startsWith: query?.filter?.author } };
    }

    if (user.role.slug !== ADMIN_ROLE) {
      where['is_published'] = true;
    }

    return this.prisma.post.findMany({ where });
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

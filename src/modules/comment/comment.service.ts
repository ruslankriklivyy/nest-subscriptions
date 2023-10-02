import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateAndUpdateCommentDto } from './dto/create-update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  getAllByPost(postId: number) {
    return this.prisma.comment.findMany({ where: { post_id: postId } });
  }

  create(
    userId: number,
    postId: number,
    commentDto: CreateAndUpdateCommentDto,
  ) {
    return this.prisma.comment.create({
      data: { post_id: postId, author_id: userId, ...commentDto },
      include: { author: true },
    });
  }

  delete(id: number) {
    return this.prisma.comment.delete({
      where: { id },
    });
  }
}

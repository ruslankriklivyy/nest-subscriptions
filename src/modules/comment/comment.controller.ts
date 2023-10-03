import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateAndUpdateCommentDto } from './dto/create-update-comment.dto';
import { User } from '../../decorators/user.decorator';
import { UserEntity } from '../user/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comment')
@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/post/:postId')
  getAllByPost(@Param() { postId }) {
    return this.commentService.getAllByPost(Number(postId));
  }

  @Post('/post/:postId')
  create(
    @User() user: UserEntity,
    @Param() { postId },
    @Body() commentDto: CreateAndUpdateCommentDto,
  ) {
    return this.commentService.create(user.id, Number(postId), commentDto);
  }

  @Delete('/:id')
  delete(@Param() { id }) {
    return this.commentService.delete(Number(id));
  }
}

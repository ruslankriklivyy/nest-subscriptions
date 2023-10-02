import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../../decorators/user.decorator';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAll() {
    return this.postService.getAll();
  }

  @Get('/:id')
  getOne(@Param() { id }, @User() userId: number) {
    return this.postService.getOne(Number(id), userId);
  }

  @Post()
  create(@User() userId: number, @Body() postDto: CreatePostDto) {
    return this.postService.create(userId, postDto);
  }

  @Put('/:id')
  update(
    @Param() { id },
    @User() userId: number,
    @Body() postDto: UpdatePostDto,
  ) {
    return this.postService.update(Number(id), userId, postDto);
  }

  @Delete('/:id')
  delete(@Param() { id }) {
    return this.postService.delete(Number(id));
  }
}

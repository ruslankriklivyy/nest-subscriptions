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
import { UserEntity } from '../user/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Post')
@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAll() {
    return this.postService.getAll();
  }

  @Get('/:id')
  getOne(@Param() { id }, @User() user: UserEntity) {
    return this.postService.getOne(Number(id), user.id);
  }

  @Post()
  create(@User() user: UserEntity, @Body() postDto: CreatePostDto) {
    return this.postService.create(user.id, postDto);
  }

  @Put('/:id')
  update(
    @Param() { id },
    @User() user: UserEntity,
    @Body() postDto: UpdatePostDto,
  ) {
    return this.postService.update(Number(id), user.id, postDto);
  }

  @Delete('/:id')
  delete(@Param() { id }) {
    return this.postService.delete(Number(id));
  }
}

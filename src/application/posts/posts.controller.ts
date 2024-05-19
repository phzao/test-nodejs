import {
  Controller,
  Get,
  Post as HttpPost,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@infrastructure/users/user.decorator';
import { IUserEntity } from '@domain/users/user.interface';
import { CommentDto } from '@application/comments/dto/comment.dto';

import { PostsService } from './posts.services';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
const POSTS_V1 = 'v1/posts';

@ApiTags('Posts')
@Controller('')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'List posts' })
  @Get(POSTS_V1)
  @ApiResponse({ status: 200, type: [CreatePostDto] })
  async findAll() {
    return this.postsService.findAll();
  }

  @ApiOperation({ summary: 'Save a new post' })
  @HttpPost(POSTS_V1)
  @ApiResponse({ status: 200, type: [CreatePostDto] })
  async create(
    @Body() createPostDto: CreatePostDto,
    @User() user: IUserEntity,
  ) {
    return this.postsService.create(createPostDto, user.id);
  }

  @ApiOperation({ summary: 'List Post details' })
  @Get(`${POSTS_V1}/:id`)
  async findOne(@Param('id') id: string) {
    return this.postsService.findById(id);
  }

  @ApiOperation({ summary: 'Update Post' })
  @Put(`${POSTS_V1}/:id`)
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @User() user: IUserEntity,
  ) {
    return this.postsService.update(id, updatePostDto, user.id);
  }

  @ApiOperation({ summary: 'Remove Post' })
  @Delete(`${POSTS_V1}/:id`)
  async remove(@Param('id') id: string, @User() user: IUserEntity) {
    return this.postsService.remove(id, user.id);
  }

  @ApiOperation({ summary: 'Like Post' })
  @HttpCode(HttpStatus.OK)
  @HttpPost(`${POSTS_V1}/:id/like`)
  async likePost(@Param('id') id: string) {
    return this.postsService.likePost(id);
  }

  @ApiOperation({ summary: 'Unlike Post' })
  @HttpCode(HttpStatus.OK)
  @HttpPost(`${POSTS_V1}/:id/unlike`)
  async unlikePost(@Param('id') id: string) {
    return this.postsService.unlikePost(id);
  }

  @ApiOperation({ summary: 'Register a comment' })
  @HttpPost(`${POSTS_V1}/:id/comment`)
  async addComment(
    @Param('id') id: string,
    @Body() comment: CommentDto,
    @User() user: IUserEntity,
  ) {
    return this.postsService.addComment(comment, user.id, id);
  }

  @ApiOperation({ summary: 'Update a comment on at Post' })
  @Put(`${POSTS_V1}/:id/comment`)
  async updateComment(
    @Param('id') id: string,
    @Body() comment: CommentDto,
    @User() user: IUserEntity,
  ) {
    return this.postsService.addComment(comment, user.id, id);
  }

  @ApiOperation({ summary: 'Report Post' })
  @Get(`${POSTS_V1}/:id/report`)
  async postsReport(@Param('id') id: string) {
    return this.postsService.findById(id);
  }
}

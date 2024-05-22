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
import { SWAGGER_TXT } from '@resources/translate/swagger.text';

import { PostsService } from './posts.services';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
const POSTS_V1 = 'v1/posts';

@ApiTags('Posts')
@Controller('')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: SWAGGER_TXT.post.list })
  @Get(POSTS_V1)
  @ApiResponse({ status: 200, type: [CreatePostDto] })
  async findAll() {
    return this.postsService.findAll();
  }

  @ApiOperation({ summary: SWAGGER_TXT.post.save })
  @HttpPost(POSTS_V1)
  @ApiResponse({ status: 200, type: [CreatePostDto] })
  async create(
    @Body() createPostDto: CreatePostDto,
    @User() user: IUserEntity,
  ) {
    return this.postsService.create(createPostDto, user.id);
  }

  @ApiOperation({ summary: SWAGGER_TXT.post.list_post_details })
  @Get(`${POSTS_V1}/:id`)
  async findOne(@Param('id') id: string) {
    return this.postsService.findById(id);
  }

  @ApiOperation({ summary: SWAGGER_TXT.post.update })
  @Put(`${POSTS_V1}/:id`)
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @User() user: IUserEntity,
  ) {
    return this.postsService.update(id, updatePostDto, user.id);
  }

  @ApiOperation({ summary: SWAGGER_TXT.post.remove })
  @Delete(`${POSTS_V1}/:id`)
  async remove(@Param('id') id: string, @User() user: IUserEntity) {
    return this.postsService.remove(id, user.id);
  }

  @ApiOperation({ summary: SWAGGER_TXT.post.like })
  @HttpCode(HttpStatus.OK)
  @HttpPost(`${POSTS_V1}/:id/like`)
  async likePost(@Param('id') id: string) {
    return this.postsService.likePost(id);
  }

  @ApiOperation({ summary: SWAGGER_TXT.post.unlike })
  @HttpCode(HttpStatus.OK)
  @HttpPost(`${POSTS_V1}/:id/unlike`)
  async unlikePost(@Param('id') id: string) {
    return this.postsService.unlikePost(id);
  }

  @ApiOperation({ summary: SWAGGER_TXT.post.register_comment })
  @HttpPost(`${POSTS_V1}/:id/comment`)
  async addComment(
    @Param('id') id: string,
    @Body() comment: CommentDto,
    @User() user: IUserEntity,
  ) {
    return this.postsService.addComment(comment, user.id, id);
  }

  @ApiOperation({ summary: SWAGGER_TXT.post.update_comment })
  @Put(`${POSTS_V1}/:id/comment`)
  async updateComment(
    @Param('id') id: string,
    @Body() comment: CommentDto,
    @User() user: IUserEntity,
  ) {
    return this.postsService.addComment(comment, user.id, id);
  }

  @ApiOperation({ summary: SWAGGER_TXT.post.report})
  @Get(`v1/report/posts`)
  async postsReport() {
    return this.postsService.reportPosts();
  }
}

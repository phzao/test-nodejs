import {
  Controller,
  Get,
  Post as HttpPost,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@infrastructure/auth/jwt-auth.guard';
import { User } from '@infrastructure/users/user.decorator';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'List users' })
  @Get()
  @ApiResponse({ status: 200, type: [PostDto] })
  async findAll() {
    return this.postsService.findAll();
  }

  @ApiOperation({ summary: 'List users' })
  @UseGuards(JwtAuthGuard)
  @HttpPost()
  @ApiResponse({ status: 200, type: [PostDto] })
  async create(@Body() createPostDto: PostDto, @User() user) {
    return this.postsService.create(createPostDto, user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: PostDto,
    @User() user,
  ) {
    return this.postsService.update(id, updatePostDto, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @User() user) {
    return this.postsService.remove(id, user.id);
  }
  @UseGuards(JwtAuthGuard)
  @HttpPost(':id/like')
  async likePost(@Param('id') id: string) {
    return this.postsService.likePost(id);
  }

  @UseGuards(JwtAuthGuard)
  @HttpPost(':id/unlike')
  async unlikePost(@Param('id') id: string) {
    return this.postsService.unlikePost(id);
  }
}

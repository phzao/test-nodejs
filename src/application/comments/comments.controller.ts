import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@infrastructure/auth/jwt-auth.guard';
import { User } from '@infrastructure/users/user.decorator';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':postId')
  async create(
    @Body() commentDto: CommentDto,
    @User() user,
    @Param('postId') postId: string,
  ) {
    return this.commentsService.create(commentDto, user.id, postId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() commentDto: CommentDto,
    @User() user,
  ) {
    return this.commentsService.update(id, commentDto, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @User() user) {
    return this.commentsService.remove(id, user.id);
  }
}

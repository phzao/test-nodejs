import { Controller, Body, Param, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@infrastructure/auth/jwt-auth.guard';
import { User } from '@infrastructure/users/user.decorator';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() commentDto: CommentDto,
    @User() user,
  ) {
    return this.commentsService.update(id, commentDto, user.id);
  }
}

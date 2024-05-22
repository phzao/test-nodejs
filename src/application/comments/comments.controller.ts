import { Controller, Body, Param, Put } from '@nestjs/common';
import { User } from '@infrastructure/users/';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IUserEntity } from '@domain/users';
import { SWAGGER_TXT } from '@resources/translate/swagger.text';

import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';
const COMMENTS_V1 = 'v1/commentsj';

@ApiTags('Posts')
@Controller('')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: SWAGGER_TXT.comments.edit_comment })
  @ApiResponse({ status: 200, type: [CommentDto] })
  @Put(`${COMMENTS_V1}/:id`)
  async update(
    @Param('id') id: string,
    @Body() commentDto: CommentDto,
    @User() user: IUserEntity,
  ) {
    return this.commentsService.update(id, commentDto, user.id);
  }
}

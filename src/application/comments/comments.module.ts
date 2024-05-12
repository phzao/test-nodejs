import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from '@domain/comments/comment.entity';

import { PostsService } from '@application/posts/posts.service';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { UsersService } from '@application/users/users.services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService, PostsService, UsersService],
  exports: [CommentsService],
})
export class CommentsModule {}

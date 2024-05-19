import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostRepository } from '@infrastructure/repositories/posts/posts.repository';
import { CommentsService } from '@application/comments/comments.service';
import { CommentsRepository } from '@infrastructure/repositories/comments/comments.repository';
import { CommentSchema } from '@application/comments/entities/comments.entity';

import { PostsController } from './posts.controller';
import { PostsService } from './posts.services';
import { PostSchema } from './entities/post.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Post', schema: PostSchema },
      { name: 'Comment', schema: CommentSchema },
    ]),
  ],
  controllers: [PostsController],
  providers: [
    PostsService,
    PostRepository,
    CommentsService,
    CommentsRepository,
  ],
  exports: [PostsService, PostRepository],
})
export class PostsModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '@domain/posts/post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { CommentsService } from '@application/comments/comments.service';
import { UsersService } from '@application/users/users.services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [PostsController],
  providers: [PostsService, UsersService, CommentsService],
  exports: [PostsService],
})
export class PostsModule {}

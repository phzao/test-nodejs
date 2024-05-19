import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CommentsRepository } from '@infrastructure/repositories/comments/comments.repository';
import { CommentSchema } from './entities/comments.entity';
import { CommentsService } from './comments.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
  ],
  providers: [CommentsService],
  exports: [CommentsService, CommentsRepository],
})
export class CommentsModule {}

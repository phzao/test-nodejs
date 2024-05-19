import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CommentsRepository } from '@infrastructure/repositories/comments/comments.repository';
import { CommentDto } from './dto/comment.dto';
import { CommentDocument } from './entities/comments.entity';

@Injectable()
export class CommentsService {
  constructor(private commentsRepository: CommentsRepository) {}

  async create(
    commentDto: CommentDto,
    userId: string,
    postId: string,
  ): Promise<CommentDocument> {
    const comment: CommentDocument = await this.commentsRepository.create({
      ...commentDto,
      userId,
      postId,
    });

    return comment;
  }

  async findOne(id: string): Promise<CommentDocument> {
    const comment = await this.commentsRepository.findById(id);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }
  async findOneIfIsOwner(
    id: string,
    userId: string,
  ): Promise<CommentDocument | null> {
    const comment: any = await this.commentsRepository.findById(id);
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.userId.toString() !== userId) {
      throw new UnauthorizedException(
        'You are not allowed to update this comment',
      );
    }
    return comment;
  }

  async update(
    id: string,
    commentDto: CommentDto,
    userId: string,
  ): Promise<CommentDocument | null> {
    const comment: any = await this.commentsRepository.findById(id);
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.userId.toString() !== userId) {
      throw new UnauthorizedException(
        'You are not allowed to update this comment',
      );
    }
    return await this.commentsRepository.update(id, commentDto);
  }

  async remove(id: string): Promise<void> {
    await this.commentsRepository.update(id, { deleted: true });
  }
}

import { CommentDto } from '@application/comments/dto/comment.dto';
import { Comment, CommentDocument } from '@application/comments/entities/comments.entity';

export interface ICommentsRepository {
  findById(id: string): Promise<CommentDocument | null>;
  findByPostId(postId: string): Promise<CommentDocument[] | null>;
  create(comment: CommentDto): Promise<CommentDocument>;
  update(
    id: string,
    updatedComment: Partial<Comment>,
  ): Promise<CommentDocument | null>;
  delete(id: string): Promise<void>;
  getCommentsByPostId(postId: string): Promise<CommentDocument[]>;
}

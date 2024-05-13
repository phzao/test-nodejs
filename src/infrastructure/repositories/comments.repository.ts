import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from '@domain/comments/comment.entity';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
  ) {}

  async findByPostId(postId: string): Promise<Comment[]> {
    return this.commentModel.find({ post_id: postId }).exec();
  }

  async findById(id: string): Promise<Comment | null> {
    return this.commentModel.findById(id).exec();
  }

  async create(comment: Comment): Promise<Comment> {
    const newComment = new this.commentModel(comment);
    return newComment.save();
  }

  async update(
    id: string,
    updatedComment: Partial<Comment>,
  ): Promise<Comment | null> {
    return this.commentModel
      .findByIdAndUpdate(id, updatedComment, { new: true })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.commentModel.findByIdAndDelete(id).exec();
  }
}

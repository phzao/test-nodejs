import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Comment,
  CommentDocument,
} from '@application/comments/entities/comments.entity';
import { ICommentsRepository } from './interfaces/comments-repository.interface';
import { ICreateComment } from './interfaces/create-comment.interface';

@Injectable()
export class CommentsRepository implements ICommentsRepository {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
  ) {}

  async findByPostId(postId: string): Promise<CommentDocument[]> {
    return this.commentModel.find({ post_id: postId }).exec();
  }

  async findById(id: string): Promise<CommentDocument | null> {
    return this.commentModel.findById(id).exec();
  }

  async create(comment: ICreateComment): Promise<CommentDocument> {
    const newComment = new this.commentModel(comment);
    return newComment.save();
  }

  async update(
    id: string,
    updatedComment: Partial<Comment>,
  ): Promise<CommentDocument | null> {
    return this.commentModel
      .findByIdAndUpdate(id, updatedComment, { new: true })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.commentModel.findByIdAndDelete(id).exec();
  }

  async getCommentsByPostId(postId: string): Promise<CommentDocument[]> {
    return this.commentModel.find({ post_id: postId }).exec();
  }
}

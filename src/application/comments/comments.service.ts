import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Comment, CommentDocument } from '@domain/comments/comment.entity';
import { PostsService } from '@application/posts/posts.service';
import { UsersService } from '@application/users/users.services';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private postsService: PostsService,
    private usersService: UsersService,
  ) {}

  async create(
    commentDto: CommentDto,
    userId: string,
    postId: string,
  ): Promise<Comment> {
    const post: any = await this.postsService.findOne(postId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    const comment = new this.commentModel({ ...commentDto, userId, postId });
    await comment.save();

    const postOwner: any = await this.usersService.findById(post.userId);
    if (postOwner.email) {
    }

    post.comments.push(comment._id);
    await post.save();
    return comment;
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.commentModel.findById(id).exec();
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async update(
    id: string,
    commentDto: CommentDto,
    userId: string,
  ): Promise<Comment> {
    const comment: any = await this.findOne(id);
    if (comment.userId.toString() !== userId) {
      throw new UnauthorizedException(
        'You are not allowed to update this comment',
      );
    }
    comment.set(commentDto);
    return comment.save();
  }

  async remove(id: string, userId: string): Promise<void> {
    const comment: any = await this.findOne(id);
    const post: any = await this.postsService.findOne(comment.postId);
    if (
      comment.userId.toString() !== userId &&
      post.userId.toString() !== userId
    ) {
      throw new UnauthorizedException(
        'You are not allowed to delete this comment',
      );
    }
    comment.deleted = true;
    await comment.save();
  }

  async getCommentsByPostId(postId: string) {
    try {
      const comments = await this.commentModel.find({ post_id: postId }).exec();
      return comments;
    } catch (error) {
      throw new Error(`Failed to fetch comments for post ${postId}: ${error}`);
    }
  }
}

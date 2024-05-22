import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PostRepository } from '@infrastructure/repositories/posts/posts.repository';
import { PostWithReportDto } from '@infrastructure/repositories/posts/interfaces/post-report.interface';
import { CommentDocument } from '@application/comments/entities/comments.entity';
import { CommentsService } from '@application/comments/comments.service';
import { CommentDto } from '@application/comments/dto/comment.dto';

import { PostDocument } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { RemoveCommentDto } from './dto/remove-comment.dto';
import { IReportPosts } from '@infrastructure/repositories/posts/interfaces/report-post.interface';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostRepository,
    private readonly commentsService: CommentsService,
  ) {}

  async findAll(): Promise<PostDocument[]> {
    return this.postsRepository.findAll();
  }

  async create(
    createPostDto: CreatePostDto,
    userId: string,
  ): Promise<PostDocument> {
    const createdPost = await this.postsRepository.create(
      createPostDto,
      userId,
    );
    return createdPost.save();
  }

  async findById(id: string): Promise<PostDocument | null> {
    const post = await this.postsRepository.viewIncremment(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
    userId: string,
  ): Promise<PostDocument> {
    const post: any = await this.postsRepository.findById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    if (post.userId !== userId) {
      throw new UnauthorizedException(
        'You are not allowed to update this post',
      );
    }
    const change = { date: new Date(), change: JSON.stringify(updatePostDto) };
    const history = [...post.history, change];
    return this.postsRepository.update(id, { ...updatePostDto, history });
  }

  async remove(postId: string, userId: string): Promise<PostDocument | null> {
    const post: any = await this.postsRepository.findById(postId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    if (post.userId !== userId) {
      throw new UnauthorizedException(
        'You are not allowed to delete this post',
      );
    }
    return await this.postsRepository.delete(postId);
  }

  async likePost(postId: string): Promise<PostDocument> {
    return this.postsRepository.likePost(postId);
  }

  async unlikePost(postId: string): Promise<PostDocument> {
    return this.postsRepository.unLikePost(postId);
  }

  async incrementViewedCount(postId: string): Promise<PostDocument> {
    const post = await this.postsRepository.findById(postId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    post.viewedCount++;
    await post.save();
    return post;
  }

  async findAllWithReport(): Promise<PostWithReportDto[]> {
    return await this.postsRepository.findAllWithReport();
  }

  async addComment(
    comment: CommentDto,
    userId: string,
    postId: string,
  ): Promise<CommentDocument | null> {
    const post: PostDocument = await this.postsRepository.findById(postId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    const commentDoc: CommentDocument = await this.commentsService.create(
      comment,
      userId,
      postId,
    );

    await this.postsRepository.addComment(postId, commentDoc._id);
    return commentDoc;
  }

  async removeComment(params: RemoveCommentDto): Promise<void> {
    const post: PostDocument = await this.postsRepository.findById(
      params.postId,
    );
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    if (post.userId.toString() !== params.userId) {
      throw new UnauthorizedException(
        'You are not allowed to remove anything on this post',
      );
    }
    const comment: CommentDocument =
      await this.commentsService.findOneIfIsOwner(
        params.commentId,
        params.userId,
      );
    await this.commentsService.remove(comment._id);
  }

  async reportPosts(): Promise<IReportPosts[]> {
    return this.postsRepository.findAllToReport();
  }
}

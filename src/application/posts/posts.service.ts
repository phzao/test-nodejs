import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Post, PostDocument } from '@domain/posts/post.entity';
import { CommentsService } from '@application/comments/comments.service';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private readonly commentService: CommentsService,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async create(createPostDto: PostDto, userId: string): Promise<Post> {
    const createdPost = new this.postModel({ ...createPostDto, userId });
    return createdPost.save();
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postModel.findById(id).exec();
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async update(
    id: string,
    updatePostDto: PostDto,
    userId: string,
  ): Promise<Post> {
    const post: any = await this.postModel.findById(id).exec();
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    if (post.userId !== userId) {
      throw new UnauthorizedException(
        'You are not allowed to update this post',
      );
    }
    const change = { date: new Date(), change: JSON.stringify(updatePostDto) };
    post.history.push(change);
    post.set(updatePostDto);
    return post.save();
  }

  async remove(id: string, userId: string): Promise<void> {
    const post: any = await this.postModel.findById(id).exec();
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    if (post.userId !== userId) {
      throw new UnauthorizedException(
        'You are not allowed to delete this post',
      );
    }
    await this.postModel.findByIdAndDelete(id).exec();
  }

  async likePost(postId: string): Promise<Post> {
    return this.postModel
      .findByIdAndUpdate(postId, { $inc: { likes: 1 } }, { new: true })
      .exec();
  }

  async unlikePost(postId: string): Promise<Post> {
    return this.postModel
      .findByIdAndUpdate(postId, { $inc: { unlikes: 1 } }, { new: true })
      .exec();
  }

  async incrementViewedCount(postId: string): Promise<Post> {
    const post = await this.postModel.findById(postId).exec();
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    post.viewedCount++;
    await post.save();
    return post;
  }

  async findAllWithReport(): Promise<
    {
      title: string;
      comments: number;
      views: number;
      likes: number;
      dislikes: number;
    }[]
  > {
    return await this.postModel.aggregate([
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'postId',
          as: 'comments',
        },
      },
      {
        $project: {
          title: 1,
          comments: { $size: '$comments' },
          views: 1,
          likes: 1,
          dislikes: 1,
        },
      },
    ]);
  }
  async getCommentsByPostId(postId: string) {
    return this.commentService.getCommentsByPostId(postId);
  }
}

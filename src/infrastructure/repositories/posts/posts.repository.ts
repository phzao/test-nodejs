import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '@application/posts/entities/post.entity';
import { CreatePostDto } from '@application/posts/dto/create-post.dto';
import { IPostRepository } from './interfaces/post-repository.interface';
import { PostWithReportDto } from './interfaces/post-report.interface';

@Injectable()
export class PostRepository implements IPostRepository {
  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<PostDocument>,
  ) {}

  async findAll(): Promise<PostDocument[]> {
    return this.postModel.find().exec();
  }

  async findById(id: string): Promise<PostDocument | null> {
    return this.postModel.findById(id).exec();
  }

  async create(
    createPostDto: CreatePostDto,
    userId: string,
  ): Promise<PostDocument> {
    const createdPost = new this.postModel({ ...createPostDto, userId });
    return createdPost.save();
  }

  async update(
    id: string,
    post: Partial<PostDocument>,
  ): Promise<PostDocument | null> {
    return this.postModel.findByIdAndUpdate(id, post, { new: true }).exec();
  }

  async delete(id: string): Promise<PostDocument | null> {
    return await this.postModel.findByIdAndDelete(id).exec();
  }

  async findByParams(
    params: Partial<CreatePostDto>,
  ): Promise<PostDocument | null> {
    return await this.postModel.findOne(params).exec();
  }

  async likePost(postId: string): Promise<PostDocument | null> {
    return this.postModel.findByIdAndUpdate(
      postId,
      { $inc: { likes: 1 } },
      { new: true },
    );
  }

  async unLikePost(postId: string): Promise<PostDocument | null> {
    return this.postModel.findByIdAndUpdate(
      postId,
      { $inc: { unlikes: 1 } },
      { new: true },
    );
  }

  async viewIncremment(postId: string): Promise<PostDocument | any> {
    await this.postModel.findByIdAndUpdate(
      postId,
      { $inc: { viewedCount: 1 } },
      { new: true },
    );
    const postData = await this.postModel
      .aggregate([
        { $match: { _id: new Types.ObjectId(postId) } },
        {
          $lookup: {
            from: 'comments',
            localField: 'comments',
            foreignField: '_id',
            as: 'comments',
          },
        },
        {
          $unwind: {
            path: '$comments',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $sort: { 'comments.ref_id': -1 },
        },
        {
          $group: {
            _id: '$_id',
            userId: { $first: '$userId' },
            title: { $first: '$title' },
            description: { $first: '$description' },
            history: { $first: '$history' },
            viewedCount: { $first: '$viewedCount' },
            likes: { $first: '$likes' },
            unlikes: { $first: '$unlikes' },
            deleted: { $first: '$deleted' },
            createdAt: { $first: '$createdAt' },
            comments: { $push: '$comments' },
          },
        },
      ])
      .exec();
    return Array.isArray(postData) ? postData[0] : postData;
  }

  async findAllWithReport(): Promise<PostWithReportDto[]> {
    return this.postModel.aggregate([
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

  async addComment(
    postId: string,
    commentId: string,
  ): Promise<PostDocument | null> {
    return this.postModel.findOneAndUpdate(
      { _id: postId },
      { $addToSet: { comments: commentId } },
    );
  }
}

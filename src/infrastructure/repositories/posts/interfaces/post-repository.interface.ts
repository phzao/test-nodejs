import { PostDocument } from '@application/posts/entities/post.entity';
import { CreatePostDto } from '@application/posts/dto/create-post.dto';
import { PostWithReportDto } from './post-report.interface';

export interface IPostRepository {
  findAll(): Promise<PostDocument[]>;
  findById(id: string): Promise<PostDocument | null>;
  create(createPostDto: CreatePostDto, userId: string): Promise<PostDocument>;
  update(id: string, user: Partial<PostDocument>): Promise<PostDocument | null>;
  delete(postId: string): Promise<PostDocument | null>;
  findByParams(params: Partial<CreatePostDto>): Promise<PostDocument | null>;
  likePost(postId: string): Promise<PostDocument>;
  unLikePost(postId: string): Promise<PostDocument>;
  findAllWithReport(): Promise<PostWithReportDto[]>;
  addComment(postId: string, commentId: string): Promise<PostDocument | null>;
  viewIncremment(postId: string): Promise<PostDocument>;
}

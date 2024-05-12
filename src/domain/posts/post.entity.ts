import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: [] })
  history: { date: Date; change: string }[];

  @Prop({ default: 0 })
  viewedCount: number;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ default: 0 })
  unlikes: number;

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }] })
  comments: Types.ObjectId[];
}

export const PostSchema = SchemaFactory.createForClass(Post);

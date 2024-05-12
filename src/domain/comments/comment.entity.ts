import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Post', required: true })
  postId: Types.ObjectId;

  @Prop({ required: true })
  description: string;

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ default: new Date() })
  createdAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

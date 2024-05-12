import { Document } from 'mongoose';
import { UserEntity } from '@domain/users/user.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User implements UserEntity {
  @Prop({ required: true, maxlength: 100 })
  name: string;

  @Prop({ required: true, maxlength: 100, unique: true })
  username: string;

  @Prop({ required: true, maxlength: 191 })
  email: string;

  @Prop({ required: true, select: false })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

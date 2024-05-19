import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@application/users/entities/user.entity';
import { CreateUserDto } from '@application/users/dto/create-user.dto';
import { UserEditDto } from '@application/users/dto/user-edit.dto';
import { UserParamsFind } from '@application/users/dto/user-params.dto';
import { IUsersRepository } from './interfaces/user-repository.interface';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const user = new this.userModel(createUserDto);
    const salt = 10;
    user.password = await bcrypt.hash(user.password, salt);

    return user.save();
  }

  async update(
    id: string,
    user: Partial<UserEditDto>,
  ): Promise<UserDocument | null> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }

  async delete(id: string): Promise<UserDocument | null> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }

  async findByParams(
    params: Partial<UserParamsFind>,
  ): Promise<UserDocument | null> {
    return await this.userModel.findOne(params).exec();
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ username }).select('+password').exec();
  }
}

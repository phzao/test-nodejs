import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument } from './entities/user.entity';
import { IUserEntityService } from './interfaces/user-service.interface';

@Injectable()
export class UserService implements IUserEntityService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const user = new this.userModel(createUserDto);
    user.password = await bcrypt.hash(createUserDto.password, 10);

    return user.save();
  }

  async update(id: string, user: UserDto): Promise<UserDocument | null> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }

  async delete(id: string): Promise<UserDocument | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username }).select('+password').exec();
  }
}
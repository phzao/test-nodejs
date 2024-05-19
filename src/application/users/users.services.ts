import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@infrastructure/repositories/users/users.repository';

import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument } from './entities/user.entity';
import { IUsersService } from './interfaces/users-service.interface';
import { UserEditDto } from './dto/user-edit.dto';

@Injectable()
export class UsersService implements IUsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async findAll(): Promise<UserDocument[]> {
    return this.userRepository.findAll();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userRepository.findById(id);
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const user = await this.userRepository.create(createUserDto);
    const salt = 10;
    user.password = await bcrypt.hash(createUserDto.password, salt);

    return user.save();
  }

  async update(id: string, user: UserEditDto): Promise<UserDocument | null> {
    return this.userRepository.update(id, user);
  }

  async delete(id: string): Promise<UserDocument | null> {
    return this.userRepository.delete(id);
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    return this.userRepository.findByUsername(username);
  }
}

import { CreateUserDto } from '@application/users/dto/create-user.dto';
import { UserEditDto } from '@application/users/dto/user-edit.dto';
import { UserParamsFind } from '@application/users/dto/user-params.dto';
import { UserDocument } from '@application/users/entities/user.entity';

export interface IUsersRepository {
  findAll(): Promise<UserDocument[]>;
  findById(id: string): Promise<UserDocument | null>;
  create(createUserDto: CreateUserDto): Promise<UserDocument>;
  update(id: string, user: Partial<UserEditDto>): Promise<UserDocument | null>;
  delete(id: string): Promise<UserDocument | null>;
  findByParams(params: Partial<UserParamsFind>): Promise<UserDocument | null>;
  findByUsername(username: string): Promise<UserDocument | null>;
}

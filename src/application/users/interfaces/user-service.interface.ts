import { UserEntity } from '@domain/users/user.entity';
import { UserDto } from '../dto/user.dto';

export interface IUserEntityService {
  findAll(): Promise<UserEntity[]>;
  findById(id: string): Promise<UserEntity | null>;
  create(user: UserDto): Promise<UserEntity>;
  update(id: string, user: UserDto): Promise<UserEntity | null>;
  delete(id: string): Promise<UserEntity | null>;
}

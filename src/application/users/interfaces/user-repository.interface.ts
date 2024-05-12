import { User } from './user.interface';
import { UserEntity } from './user-entity.interface';

export interface UserRepository {
  findAll(): Promise<UserEntity[]>;
  findById(id: string): Promise<UserEntity | null>;
  create(user: User): Promise<UserEntity>;
  update(id: string, user: User): Promise<UserEntity | null>;
  delete(id: string): Promise<UserEntity | null>;
}

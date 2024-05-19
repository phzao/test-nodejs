import { IUserEntity } from './user.interface';

export class UserEntity implements IUserEntity {
  id?: string;
  name: string;
  email: string;
  username: string;

  constructor(name: string, email: string, username: string) {
    this.name = name;
    this.email = email;
    this.username = username;
  }
}

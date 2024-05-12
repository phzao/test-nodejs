import { IUserEntity } from "./user.interface";

export class UserEntity implements IUserEntity {
  id?: string;
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

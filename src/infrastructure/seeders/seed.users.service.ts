import { UserService } from '@application/users/user.services';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedUserService {
  constructor(private readonly usersService: UserService) {}

  async seedUsers() {
    const users = [
      { name: 'John Doe', username: 'john', email: 'john@example.com', password: '123' },
      { name: 'Jane Doe', username: 'jane', email: 'jane@example.com', password: '123' },
    ];

    for (const user of users) {
      await this.usersService.create(user);
    }
  }
}

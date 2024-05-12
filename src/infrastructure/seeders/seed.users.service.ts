import { Injectable } from '@nestjs/common';
import { UsersService } from '@application/users/users.services';

@Injectable()
export class SeedUserService {
  constructor(private readonly usersService: UsersService) {}

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

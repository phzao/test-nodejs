import { CreateUserDto } from '../dto/create-user.dto';
import { UserEditDto } from '../dto/user-edit.dto';

export const USERS_LIST = {
  description: 'Users list',
  example: {},
};

export const USERS_INFO = {
  name: 'id',
  description: 'User ID',
  example: 1,
};

export const USERS_EDIT_PARAM = {
  name: 'id',
  description: 'User ID',
  example: 1,
};

export const USERS_EDIT_BODY = {
  description: 'Edit user data',
  type: UserEditDto,
  examples: {
    a: {
      name: 'New Name',
    },
  },
};

export const USERS_EDIT_RESPONSE = {
  status: 200,
  description: 'Adding User',
  schema: {
    type: 'object',
    example: {
      name: 'Silva Sauro',
      username: 'phbotelho',
      email: 'phbotelho@gmail.com',
    },
  },
};

export const USERS_ADD = {
  description: 'Add User',
  type: CreateUserDto,
  examples: {
    a: {
      summary: 'Add User',
      description: 'Adding a new user',
      value: {
        name: 'PHz',
        username: 'someuser',
        email: 'mymail@gmail.com',
        password: '12345',
      },
    },
  },
};

export const USERS_ADD_RESPONSE = {
  status: 201,
  description: 'Adding User',
  schema: {
    type: 'object',
    example: {
      name: 'Homer simpson',
      username: 'simpson',
      email: 'homer@gmail.com',
    },
  },
};

export const USER_DELETE = {
  name: 'id',
  description: 'User ID to remove',
  example: 1,
}

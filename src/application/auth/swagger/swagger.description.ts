import { LoginDto } from "../dto/login.dto";

export const LOGIN_BODY = {
  description: 'User login',
  type: LoginDto,
  examples: {
    a: {
      summary: 'Standard user',
      description: 'Login with standard user credentials',
      value: {
        username: 'john',
        password: 'changeme',
      },
    },
    b: {
      summary: 'Admin user',
      description: 'Login with admin user credentials',
      value: {
        username: 'admin',
        password: 'adminpass',
      },
    },
  },
};

export const LOGIN_RESPONSE = {
  status: 200,
  description: 'User logged',
  schema: {
    type: 'object',
    example: {
      access_token: 'ksadjlfasjlaskdjfalsdjfasldjfasdfklasdkl',
    },
  },
};

export const LOGIN_RESPONSE_401 = {
  status: 401,
  description: 'Login error',
  schema: {
    type: 'object',
    example: {
      message: 'Invalid username or password',
      error: 'Unauthorized',
      statusCode: 401,
    },
  },
};

export const LOGIN_RESPONSE_400 = {
  status: 400,
  description: 'Login error params',
  schema: {
    type: 'object',
    example: {
      message: ['password must be a string'],
      error: 'Bad Request',
      statusCode: 400,
    },
  },
};

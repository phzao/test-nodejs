import * as request from 'supertest';
import mongoose from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppModule } from '../../app.module';
import { UserSchema } from './entities/user.entity';
import { IUsersService } from './interfaces/users-service.interface';
import { UsersService } from './users.services';

describe('UsersController', () => {
  let app: INestApplication;
  let userService: IUsersService;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        MongooseModule.forRoot(process.env.MONGO_CONNECTION_TEST),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    const conn = await mongoose.connect(process.env.MONGO_CONNECTION_TEST);
    await conn.connection.db.dropDatabase();
    await conn.disconnect();
    await app.close();
  });

  it('/v1/users (POST)', async () => {
    return request(app.getHttpServer())
      .post('/v1/users')
      .send({
        name: 'John Doe',
        username: 'john',
        email: 'john@example.com',
        password: '123',
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: 'John Doe',
            email: 'john@example.com',
            username: 'john',
          }),
        );
      });
  });
});

import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppModule } from '../../app.module';
import { UserSchema } from './entities/user.entity';
import mongoose from 'mongoose';

describe('UsersController', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        MongooseModule.forRoot(`mongodb://localhost:27017/tempdb`),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    const conn = await mongoose.connect('mongodb://localhost:27017/tempdb');
    await conn.connection.db.dropDatabase();
    await conn.disconnect();
    await app.close();
  });

  it('/users (POST)', async () => {
    return request(app.getHttpServer())
      .post('/users')
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

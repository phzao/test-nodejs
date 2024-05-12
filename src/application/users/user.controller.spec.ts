import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppModule } from '@app/app.module';
import { UserSchema } from './schemas/user.schema';

describe('UsersController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        MongooseModule.forRoot('mongodb://localhost:27017/test'),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ name: 'John Doe', email: 'john@example.com' })
      .expect(201)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: 'John Doe',
            email: 'john@example.com',
          }),
        );
      });
  });
});

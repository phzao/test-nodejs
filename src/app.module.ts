import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@infrastructure/auth/auth.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '@application/users';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.NODE_ENV === 'test'
        ? process.env.MONGO_CONNECTION_TEST
        : process.env.MONGO_CONNECTION,
    ),
    AuthModule,
    UsersModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { PostsModule } from '@application/posts/posts.module';
import { AuthModule } from '@infrastructure/auth/auth.module';
import { AuthGuard } from '@infrastructure/auth/auth.guard';
import { UsersModule } from '@application/users';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('TOKEN_SECRET'),
          signOptions: { expiresIn: '60m' },
        };
      },
      inject: [ConfigService],
      global: true,
    }),
    AuthModule,
    UsersModule,
    PostsModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}

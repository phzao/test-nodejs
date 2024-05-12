import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StatusModule } from '@application/status/';
import { AuthModule } from '@infrastructure/auth/auth.module';
import { UserModule } from '@application/users';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AuthModule,
    UserModule,
    StatusModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}

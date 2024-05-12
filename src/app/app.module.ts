import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE, APP_FILTER } from '@nestjs/core';
import { StatusModule } from '@application/status/';
import { GlobalExceptionFilter } from '@common/global-exception.filter';
import { AuthModule } from '@infrastructure/auth/auth.module';
import { UserModule } from '@application/users';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AuthModule, UserModule, StatusModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    AppService,
  ],
  controllers: [AppController],
})
export class AppModule {}

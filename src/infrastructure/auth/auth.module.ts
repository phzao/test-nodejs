import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '@application/auth/auth.controller';
import { UsersModule } from '@application/users/users.module';

import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'mysecretkey123',
      signOptions: { expiresIn: '48h' },
    }),
  ],
  providers: [JwtStrategy, AuthService],
  exports: [PassportModule, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

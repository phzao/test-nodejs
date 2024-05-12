import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConfig } from '@common/jwt.config';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from '@application/auth/auth.controller';
import { UserModule } from '@application/users';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(jwtConfig),
  ],
  providers: [JwtStrategy, AuthService],
  exports: [PassportModule, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

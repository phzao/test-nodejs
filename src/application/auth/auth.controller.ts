import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from '@infrastructure/auth/auth.service';
import { JwtAuthGuard } from '@infrastructure/auth/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      return this.authService.login(loginDto);
    } catch (e) {
      console.log('er', e);
      return e;
    }
  }

  @Post('public')
  async publicRoute() {
    return { message: 'This is a public route.' };
  }

  @Post('private')
  @UseGuards(JwtAuthGuard)
  async privateRoute() {
    return { message: 'This is a private route.' };
  }
}

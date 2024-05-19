import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '@infrastructure/auth/auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.loginOrFail(loginDto);
  }
}

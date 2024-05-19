import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '@infrastructure/auth/auth.service';
import { Public } from '@resources/guard/roles.decorator';
import {
  LOGIN_BODY,
  LOGIN_RESPONSE,
  LOGIN_RESPONSE_400,
  LOGIN_RESPONSE_401,
} from './swagger/swagger.description';
import { LoginDto } from './dto/login.dto';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiTags('/login')
  @ApiOperation({ summary: 'Login User' })
  @Post('/login')
  @ApiBody(LOGIN_BODY)
  @ApiResponse(LOGIN_RESPONSE)
  @ApiResponse(LOGIN_RESPONSE_400)
  @ApiResponse(LOGIN_RESPONSE_401)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.loginOrFail(loginDto);
  }
}

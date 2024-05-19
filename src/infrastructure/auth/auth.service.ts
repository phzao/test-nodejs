import * as bcrypt from 'bcrypt';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '@application/auth/dto/login.dto';
import { UsersService } from '@application/users/users.services';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async loginOrFail(loginDto: LoginDto): Promise<any> {
    const { username, password } = loginDto;
    if (!username || !password)
      throw new NotFoundException('Username and password are required!');

    const user = await this.userService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = { username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signPayload(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }

  async validateUser(payload: any): Promise<any> {
    return { userId: payload.sub, username: payload.username };
  }
}

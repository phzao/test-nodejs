import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '@infrastructure/auth/jwt-auth.guard';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument } from './entities/user.entity';
import { UserResponseDto } from './dto/user-response.dto';
import { UsersService } from './users.services';
const USERS_V1 = 'v1/users';

@Controller('')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiTags(USERS_V1)
  @ApiOperation({ summary: 'List users' })
  @Get(USERS_V1)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: [UserDto] })
  async findAll(): Promise<UserDocument[]> {
    return this.userService.findAll();
  }

  @ApiTags(USERS_V1)
  @ApiOperation({ summary: 'Show details from a specif user' })
  @Get(`${USERS_V1}/:id`)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: UserDto })
  async findById(@Param('id') id: string): Promise<UserDocument | null> {
    return this.userService.findById(id);
  }

  @ApiTags(USERS_V1)
  @Post(USERS_V1)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 201, type: UserResponseDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.create(createUserDto).then((user) => {
      const { name, username, email } = user;

      return { name, username, email };
    });
  }

  @ApiTags(USERS_V1)
  @ApiOperation({ summary: 'Update user by id' })
  @Put(`${USERS_V1}/:id`)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: UserDto })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UserDto,
  ): Promise<UserDocument | null> {
    return this.userService.update(id, updateUserDto);
  }

  @ApiTags(USERS_V1)
  @ApiOperation({ summary: 'Remove user by id' })
  @Delete(`${USERS_V1}/:id`)
  @ApiResponse({ status: 200, type: UserDto })
  async delete(@Param('id') id: string): Promise<UserDocument | null> {
    return this.userService.delete(id);
  }
}

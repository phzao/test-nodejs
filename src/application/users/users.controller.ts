import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument } from './entities/user.entity';
import { UserResponseDto } from './dto/user-response.dto';
import { UsersService } from './users.services';
import {
  USERS_ADD,
  USERS_ADD_RESPONSE,
  USERS_EDIT_BODY,
  USERS_EDIT_PARAM,
  USERS_EDIT_RESPONSE,
  USERS_INFO,
  USER_DELETE,
} from './swagger/swagger.description';
import { UserEditDto } from './dto/user-edit.dto';
const USERS_V1 = 'v1/users';

@ApiTags('Users')
@Controller('')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'List users' })
  @Get(USERS_V1)
  @ApiResponse({ status: 200, type: [UserDto] })
  async findAll(): Promise<UserDocument[]> {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Show details from a specif user' })
  @ApiParam(USERS_INFO)
  @Get(`${USERS_V1}/:id`)
  @ApiResponse({ status: 200, type: UserDto })
  async findById(@Param('id') id: string): Promise<UserDocument | null> {
    return this.userService.findById(id);
  }

  @ApiOperation({ summary: 'Add a new user' })
  @Post(USERS_V1)
  @ApiBody(USERS_ADD)
  @ApiResponse(USERS_ADD_RESPONSE)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.create(createUserDto).then((user) => {
      const { name, username, email } = user;

      return { name, username, email };
    });
  }

  @ApiOperation({ summary: 'Update user by id' })
  @ApiParam(USERS_EDIT_PARAM)
  @ApiBody(USERS_EDIT_BODY)
  @Put(`${USERS_V1}/:id`)
  @ApiResponse(USERS_EDIT_RESPONSE)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UserEditDto,
  ): Promise<UserDocument | null> {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Remove user by id' })
  @ApiParam(USER_DELETE)
  @Delete(`${USERS_V1}/:id`)
  @ApiResponse({ status: 204})
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<UserDocument | null> {
    return this.userService.delete(id);
  }
}

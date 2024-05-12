import { IsString, IsEmail, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  @MaxLength(100)
  username: string;

  @IsEmail()
  @MaxLength(191)
  email: string;

  @IsString()
  @MaxLength(100)
  password: string;
}

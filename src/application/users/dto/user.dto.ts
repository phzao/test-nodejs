import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  readonly name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(191)
  readonly email: string;

  @IsString()
  @MaxLength(100)
  readonly username: string;
}

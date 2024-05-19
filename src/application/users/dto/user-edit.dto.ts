import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserEditDto {
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  readonly name: string;
}

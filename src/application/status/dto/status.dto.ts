import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StatusDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  status: string;
}

import { IsString, MaxLength } from 'class-validator';

export class UserParamsFind{
  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  @MaxLength(100)
  username: string;

  @IsString()
  @MaxLength(191)
  email: string;
}

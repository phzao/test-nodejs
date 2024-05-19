import { IsString } from 'class-validator';
export class CommentDto {
  @IsString()
  description: string;
}

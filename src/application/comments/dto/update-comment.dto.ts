import { IsOptional, IsString } from 'class-validator';
export class CommentDto {
  @IsString()
  @IsOptional()
  description?: string;
}

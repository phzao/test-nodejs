import { ICommentEntity } from './comments.interface';

export class CommentEntity implements ICommentEntity {
  id?: string;
  description: string;

  constructor(description: string) {
    this.description = description;
  }
}

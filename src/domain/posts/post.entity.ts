import { IPostEntity } from './post.interface';

export class PostEntity implements IPostEntity {
  id?: string;
  title: string;
  description: string;

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }
}

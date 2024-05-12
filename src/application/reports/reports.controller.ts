import { Controller, Get } from '@nestjs/common';
import { PostsService } from '@application/posts/posts.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('posts')
  async generatePostReport() {
    return this.postsService.findAllWithReport();
  }
}

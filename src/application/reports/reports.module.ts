import { Module } from '@nestjs/common';
import { PostsModule } from '@application/posts/posts.module';
import { ReportsController } from './reports.controller';

@Module({
  imports: [PostsModule],
  controllers: [ReportsController],
})
export class ReportsModule {}

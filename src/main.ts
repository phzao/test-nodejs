import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { setupSwagger } from '@infrastructure/swagger';
import { AppModule } from '@app/app.module';

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { SeedUserService } from '@infrastructure/seeders/seed.users.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seedService = app.get(SeedUserService);

  try {
    await seedService.seedUsers();
    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await app.close();
  }
}

bootstrap();

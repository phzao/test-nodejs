import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '@infrastructure/database/database.module';

import { UserService } from './user.services';
import { UserController } from './user.controller';
import { UserSchema } from './entities/user.entity';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}

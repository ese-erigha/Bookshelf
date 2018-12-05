
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserSchema } from './schemas/user.schema';
import { IsUserAlreadyExist } from './validators/IsUserAlreadyExist';
import { IsValidRole } from './validators/IsValidRole';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository,IsUserAlreadyExist,IsValidRole],
  exports: [UsersService]
})
export class UsersModule {}
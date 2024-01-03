import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { DogSchema } from '../dog/schema/dog.schema';
import { RegisteredModules } from '../registered-modules/registered-modules';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Dog', schema: DogSchema },
    ]),
    RegisteredModules,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { UserSchema } from '../user/schemas/user.schema';
dotenv.config();

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    {
      provide: 'USER_SERVICE',
      useClass: UserService,
    },
  ],
  exports: ['AUTH_SERVICE', 'USER_SERVICE'],
})
export class RegisteredModules {}

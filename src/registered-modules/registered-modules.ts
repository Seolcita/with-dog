import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DogService } from '../dog/dog.service';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { DogSchema } from '../dog/schema/dog.schema';
import { UserSchema } from '../user/schemas/user.schema';
import { QuestionnaireScreenSchema } from '../questionnaire/schema/questionnaire-screen.schema';
import { QuestionnaireScreenFieldsSchema } from '../questionnaire/schema/questionnaire-screen-fields.schema';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Dog', schema: DogSchema },
      { name: 'QuestionnaireScreen', schema: QuestionnaireScreenSchema },
      {
        name: 'QuestionnaireScreenFields',
        schema: QuestionnaireScreenFieldsSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    {
      provide: 'USER_SERVICE',
      useClass: UserService,
    },
    {
      provide: 'DOG_SERVICE',
      useClass: DogService,
    },
  ],
  exports: ['AUTH_SERVICE', 'USER_SERVICE', 'DOG_SERVICE'],
})
export class RegisteredModules {}

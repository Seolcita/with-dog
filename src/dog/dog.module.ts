import { Module } from '@nestjs/common';
import { DogController } from './dog.controller';
import { DogService } from './dog.service';
import { RegisteredModules } from '../registered-modules/registered-modules';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/schemas/user.schema';
import { DogSchema } from './schema/dog.schema';
import { QuestionnaireScreenSchema } from '../questionnaire/schema/questionnaire-screen.schema';
import { QuestionnaireScreenFieldsSchema } from '../questionnaire/schema/questionnaire-screen-fields.schema';

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
    RegisteredModules,
  ],
  controllers: [DogController],
  providers: [DogService],
})
export class DogModule {}

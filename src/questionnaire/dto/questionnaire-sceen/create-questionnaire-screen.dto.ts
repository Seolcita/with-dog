import { IsObject } from 'class-validator';

import { QuestionnaireScreenFields } from '../../entities/questionnaireScreen-fields.entity';

export class CreateQuestionnaireNameScreenDto {
  @IsObject()
  readonly nameScreen: QuestionnaireScreenFields;
}

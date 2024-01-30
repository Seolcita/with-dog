import { IsBoolean, IsNumber, IsObject } from 'class-validator';

import { QuestionnaireScreenFields } from '../../entities/questionnaireScreen-fields.entity';

export class CreateQuestionnaireNameScreenFieldDto {
  @IsNumber()
  readonly step: number;

  @IsObject()
  readonly previousScreen: QuestionnaireScreenFields | null;

  @IsObject()
  readonly nextScreen: QuestionnaireScreenFields | null;

  @IsBoolean()
  readonly isCompleted: boolean;
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { QuestionnaireScreenName } from '../entities/questionnaireScreen-fields.entity';

@Schema({
  timestamps: true,
})
export class QuestionnaireScreenFields {
  @Prop()
  step: number;

  @Prop()
  previousScreen: QuestionnaireScreenName | null;

  @Prop()
  nextScreen: QuestionnaireScreenName | null;

  @Prop()
  isCompleted: boolean;
}

export const QuestionnaireScreenFieldsSchema = SchemaFactory.createForClass(
  QuestionnaireScreenFields,
);

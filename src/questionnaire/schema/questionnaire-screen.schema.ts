import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { QuestionnaireScreenFields } from './questionnaire-screen-fields.schema';

@Schema({
  timestamps: true,
})
export class QuestionnaireScreen {
  @Prop({ type: QuestionnaireScreenFields })
  nameScreen: QuestionnaireScreenFields;
}

export const QuestionnaireScreenSchema =
  SchemaFactory.createForClass(QuestionnaireScreen);

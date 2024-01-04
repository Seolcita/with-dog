import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { QuestionnaireScreenFields } from './questionnaire-screen-fields.schema';

@Schema({
  timestamps: true,
})
export class QuestionnaireScreen {
  @Prop({ type: QuestionnaireScreenFields })
  nameScreen: QuestionnaireScreenFields;

  @Prop({ type: QuestionnaireScreenFields })
  dogSizeScreen: QuestionnaireScreenFields;

  @Prop({ type: QuestionnaireScreenFields })
  heavyCoatScreen: QuestionnaireScreenFields;

  @Prop({ type: QuestionnaireScreenFields })
  coldAdaptScreen: QuestionnaireScreenFields;
}

export const QuestionnaireScreenSchema =
  SchemaFactory.createForClass(QuestionnaireScreen);

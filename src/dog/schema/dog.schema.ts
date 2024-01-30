import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import {
  QuestionnaireScreen,
  QuestionnaireScreenSchema,
} from '../../questionnaire/schema/questionnaire-screen.schema';
import { User } from '../../user/schemas/user.schema';
import { Avatar, DogSize, RegistrationStatus } from '../entities/dog.entity';
import { QuestionnaireScreenName } from '../../questionnaire/entities/questionnaireScreen-fields.entity';

@Schema({
  timestamps: true,
})
export class Dog {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  ownerId: User | Types.ObjectId;

  @Prop()
  name: string;

  @Prop({ enum: DogSize })
  dogSize: DogSize;

  @Prop()
  heavyCoat: boolean;

  @Prop()
  coldAdapt: boolean;

  @Prop({ type: Object })
  avatar: Avatar;

  @Prop({ enum: RegistrationStatus, default: RegistrationStatus.NOT_STARTED })
  registrationStatus: RegistrationStatus;

  @Prop()
  completedStep: number;

  @Prop()
  totalSteps: number;

  @Prop({ enum: QuestionnaireScreenName })
  nextScreen: QuestionnaireScreenName;

  @Prop({ type: [QuestionnaireScreenSchema] })
  screens: QuestionnaireScreen[];
}

export const DogSchema = SchemaFactory.createForClass(Dog);

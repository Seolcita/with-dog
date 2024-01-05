import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { Avatar, DogSize, RegistrationStatus } from '../entities/dog.entity';
import {
  QuestionnaireScreen,
  QuestionnaireScreenSchema,
} from '../../questionnaire/schema/questionnaire-screen.schema';
import { QuestionnaireScreenName } from '../../questionnaire/entities/questionnaireScreen-fields.entity';

@Schema({
  timestamps: true,
})
export class Dog {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  ownerId: User | Types.ObjectId;

  @Prop({ unique: true, index: true })
  name: string;

  @Prop({ enum: DogSize })
  dogSize: DogSize;

  @Prop({ enum: RegistrationStatus, default: RegistrationStatus.NOT_STARTED })
  registrationStatus: RegistrationStatus;

  @Prop()
  heavyCoat: boolean;

  @Prop()
  coldAdapt: boolean;

  @Prop()
  location: string;

  @Prop({ type: Object })
  avatar: Avatar;

  @Prop({ enum: QuestionnaireScreenName })
  nextScreen: QuestionnaireScreenName;

  @Prop({ type: [QuestionnaireScreenSchema] })
  screens: QuestionnaireScreen[];
}

export const DogSchema = SchemaFactory.createForClass(Dog);

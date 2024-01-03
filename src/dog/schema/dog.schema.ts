import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { RegistrationStatus } from '../entities/dog.entity';
import {
  QuestionnaireScreen,
  QuestionnaireScreenSchema,
} from '../../questionnaire/schema/questionnaire-screen.schema';

@Schema({
  timestamps: true,
})
export class Dog {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  ownerId: User | Types.ObjectId;

  @Prop()
  name: string;

  @Prop({ enum: RegistrationStatus, default: RegistrationStatus.NOT_STARTED })
  registrationStatus: RegistrationStatus;

  @Prop({ type: [QuestionnaireScreenSchema] })
  screens: QuestionnaireScreen[];
}

export const DogSchema = SchemaFactory.createForClass(Dog);

import { Document, Types } from 'mongoose';
import {
  QuestionnaireScreen,
  QuestionnaireScreenDocument,
} from '../../questionnaire/entities/questionnaireScreen.entity';

export enum RegistrationStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export interface DogProfile {
  id: string;
  ownerId: string;
  name: string;
  registrationStatus: RegistrationStatus;
  screens: QuestionnaireScreen[];
}

export interface DogDocument
  extends Omit<DogProfile, 'id'>,
    QuestionnaireScreenDocument,
    Document {
  _id: Types.ObjectId;
}

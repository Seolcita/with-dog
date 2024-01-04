import { Document, Types } from 'mongoose';
import {
  QuestionnaireScreen,
  QuestionnaireScreenDocument,
} from '../../questionnaire/entities/questionnaireScreen.entity';
import { QuestionnaireScreenName } from '../../questionnaire/entities/questionnaireScreen-fields.entity';

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
  nextScreen: QuestionnaireScreenName | null;
}

export interface DogDocument
  extends Omit<DogProfile, 'id'>,
    QuestionnaireScreenDocument,
    Document {
  _id: Types.ObjectId;
}

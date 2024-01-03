import { Document } from 'mongoose';
import {
  QuestionnaireScreenFields,
  QuestionnaireScreenFieldsDocument,
} from './questionnaireScreen-fields.entity';

export interface QuestionnaireScreen {
  nameScreen: QuestionnaireScreenFields;
}

export interface QuestionnaireScreenDocument
  extends QuestionnaireScreen,
    QuestionnaireScreenFieldsDocument,
    Document {}

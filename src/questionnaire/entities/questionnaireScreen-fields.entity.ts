import { Document } from 'mongoose';

export enum QuestionnaireScreenName {
  NAME_SCREEN = 'NAME_SCREEN',
  DOG_SIZE_SCREEN = 'DOG_SIZE_SCREEN',
}

export interface QuestionnaireScreenFields {
  step: number;
  previousScreen: QuestionnaireScreenName | null;
  nextScreen: QuestionnaireScreenName | null;
  isCompleted: boolean;
}

export interface QuestionnaireScreenFieldsDocument
  extends QuestionnaireScreenFields,
    Document {}

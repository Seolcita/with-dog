import { Document } from 'mongoose';
import {
  QuestionnaireScreenFields,
  QuestionnaireScreenFieldsDocument,
} from './questionnaireScreen-fields.entity';

export interface QuestionnaireScreen {
  nameScreen: QuestionnaireScreenFields;
  dogSizeScreen: QuestionnaireScreenFields;
  heavyCoatScreen: QuestionnaireScreenFields;
  coldAdaptScreen: QuestionnaireScreenFields;
  locationScreen: QuestionnaireScreenFields;
  avatarSelectionScreen: QuestionnaireScreenFields;
  completionScreen: QuestionnaireScreenFields;
}

export interface QuestionnaireScreenDocument
  extends QuestionnaireScreen,
    QuestionnaireScreenFieldsDocument,
    Document {}

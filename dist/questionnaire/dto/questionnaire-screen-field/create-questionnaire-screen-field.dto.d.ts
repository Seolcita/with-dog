import { QuestionnaireScreenFields } from '../../entities/questionnaireScreen-fields.entity';
export declare class CreateQuestionnaireNameScreenFieldDto {
    readonly step: number;
    readonly previousScreen: QuestionnaireScreenFields | null;
    readonly nextScreen: QuestionnaireScreenFields | null;
    readonly isCompleted: boolean;
}

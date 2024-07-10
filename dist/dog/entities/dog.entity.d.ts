/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Document, Types } from 'mongoose';
import { QuestionnaireScreen, QuestionnaireScreenDocument } from '../../questionnaire/entities/questionnaireScreen.entity';
import { QuestionnaireScreenName } from '../../questionnaire/entities/questionnaireScreen-fields.entity';
export declare enum RegistrationStatus {
    NOT_STARTED = "NOT_STARTED",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
}
export declare enum DogSize {
    SMALL = "SMALL",
    MEDIUM = "MEDIUM",
    LARGE = "LARGE"
}
export interface DogProfile {
    id: string;
    ownerId: string;
    name: string;
    dogSize: DogSize;
    heavyCoat: boolean;
    coldAdapt: boolean;
    avatar: Avatar;
    registrationStatus: RegistrationStatus;
    completedStep: number;
    totalSteps: number;
    screens: QuestionnaireScreen[];
    nextScreen: QuestionnaireScreenName | null;
}
export interface Avatar {
    name: string;
    src: string;
}
export interface DogDocument extends Omit<DogProfile, 'id'>, QuestionnaireScreenDocument, Document {
    _id: Types.ObjectId;
}

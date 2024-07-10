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
import { Document } from 'mongoose';
export declare enum QuestionnaireScreenName {
    NAME_SCREEN = "NAME_SCREEN",
    DOG_SIZE_SCREEN = "DOG_SIZE_SCREEN",
    HEAVY_COAT_SCREEN = "HEAVY_COAT_SCREEN",
    COLD_ADAPT_SCREEN = "COLD_ADAPT_SCREEN",
    LOCATION_SCREEN = "LOCATION_SCREEN",
    AVATAR_SELECTION_SCREEN = "AVATAR_SELECTION_SCREEN",
    COMPLETION_SCREEN = "COMPLETION_SCREEN"
}
export interface QuestionnaireScreenFields {
    step: number;
    previousScreen: QuestionnaireScreenName | null;
    nextScreen: QuestionnaireScreenName | null;
    isCompleted: boolean;
}
export interface QuestionnaireScreenFieldsDocument extends QuestionnaireScreenFields, Document {
}

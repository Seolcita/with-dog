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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { QuestionnaireScreenName } from '../entities/questionnaireScreen-fields.entity';
export declare class QuestionnaireScreenFields {
    step: number;
    previousScreen: QuestionnaireScreenName | null;
    nextScreen: QuestionnaireScreenName | null;
    isCompleted: boolean;
}
export declare const QuestionnaireScreenFieldsSchema: import("mongoose").Schema<QuestionnaireScreenFields, import("mongoose").Model<QuestionnaireScreenFields, any, any, any, import("mongoose").Document<unknown, any, QuestionnaireScreenFields> & QuestionnaireScreenFields & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, QuestionnaireScreenFields, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<QuestionnaireScreenFields>> & import("mongoose").FlatRecord<QuestionnaireScreenFields> & {
    _id: import("mongoose").Types.ObjectId;
}>;

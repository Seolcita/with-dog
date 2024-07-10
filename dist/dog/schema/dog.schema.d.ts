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
import { Types } from 'mongoose';
import { QuestionnaireScreen } from '../../questionnaire/schema/questionnaire-screen.schema';
import { User } from '../../user/schemas/user.schema';
import { Avatar, DogSize, RegistrationStatus } from '../entities/dog.entity';
import { QuestionnaireScreenName } from '../../questionnaire/entities/questionnaireScreen-fields.entity';
export declare class Dog {
    ownerId: User | Types.ObjectId;
    name: string;
    dogSize: DogSize;
    heavyCoat: boolean;
    coldAdapt: boolean;
    avatar: Avatar;
    registrationStatus: RegistrationStatus;
    completedStep: number;
    totalSteps: number;
    nextScreen: QuestionnaireScreenName;
    screens: QuestionnaireScreen[];
}
export declare const DogSchema: import("mongoose").Schema<Dog, import("mongoose").Model<Dog, any, any, any, import("mongoose").Document<unknown, any, Dog> & Dog & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Dog, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Dog>> & import("mongoose").FlatRecord<Dog> & {
    _id: Types.ObjectId;
}>;

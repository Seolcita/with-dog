"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisteredModules = void 0;
const dotenv = require("dotenv");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const dog_service_1 = require("../dog/dog.service");
const auth_service_1 = require("../auth/auth.service");
const user_service_1 = require("../user/user.service");
const dog_schema_1 = require("../dog/schema/dog.schema");
const user_schema_1 = require("../user/schemas/user.schema");
const questionnaire_screen_schema_1 = require("../questionnaire/schema/questionnaire-screen.schema");
const questionnaire_screen_fields_schema_1 = require("../questionnaire/schema/questionnaire-screen-fields.schema");
dotenv.config();
let RegisteredModules = class RegisteredModules {
};
exports.RegisteredModules = RegisteredModules;
exports.RegisteredModules = RegisteredModules = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'User', schema: user_schema_1.UserSchema },
                { name: 'Dog', schema: dog_schema_1.DogSchema },
                { name: 'QuestionnaireScreen', schema: questionnaire_screen_schema_1.QuestionnaireScreenSchema },
                {
                    name: 'QuestionnaireScreenFields',
                    schema: questionnaire_screen_fields_schema_1.QuestionnaireScreenFieldsSchema,
                },
            ]),
        ],
        providers: [
            {
                provide: 'AUTH_SERVICE',
                useClass: auth_service_1.AuthService,
            },
            {
                provide: 'USER_SERVICE',
                useClass: user_service_1.UserService,
            },
            {
                provide: 'DOG_SERVICE',
                useClass: dog_service_1.DogService,
            },
        ],
        exports: ['AUTH_SERVICE', 'USER_SERVICE', 'DOG_SERVICE'],
    })
], RegisteredModules);
//# sourceMappingURL=registered-modules.js.map
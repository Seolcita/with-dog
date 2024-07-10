"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DogModule = void 0;
const common_1 = require("@nestjs/common");
const dog_controller_1 = require("./dog.controller");
const dog_service_1 = require("./dog.service");
const registered_modules_1 = require("../registered-modules/registered-modules");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../user/schemas/user.schema");
const dog_schema_1 = require("./schema/dog.schema");
const questionnaire_screen_schema_1 = require("../questionnaire/schema/questionnaire-screen.schema");
const questionnaire_screen_fields_schema_1 = require("../questionnaire/schema/questionnaire-screen-fields.schema");
let DogModule = class DogModule {
};
exports.DogModule = DogModule;
exports.DogModule = DogModule = __decorate([
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
            registered_modules_1.RegisteredModules,
        ],
        controllers: [dog_controller_1.DogController],
        providers: [dog_service_1.DogService],
    })
], DogModule);
//# sourceMappingURL=dog.module.js.map
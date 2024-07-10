"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DogSchema = exports.Dog = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const questionnaire_screen_schema_1 = require("../../questionnaire/schema/questionnaire-screen.schema");
const dog_entity_1 = require("../entities/dog.entity");
const questionnaireScreen_fields_entity_1 = require("../../questionnaire/entities/questionnaireScreen-fields.entity");
let Dog = class Dog {
};
exports.Dog = Dog;
__decorate([
    (0, mongoose_2.Prop)({ type: mongoose_1.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", Object)
], Dog.prototype, "ownerId", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", String)
], Dog.prototype, "name", void 0);
__decorate([
    (0, mongoose_2.Prop)({ enum: dog_entity_1.DogSize }),
    __metadata("design:type", String)
], Dog.prototype, "dogSize", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", Boolean)
], Dog.prototype, "heavyCoat", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", Boolean)
], Dog.prototype, "coldAdapt", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Dog.prototype, "avatar", void 0);
__decorate([
    (0, mongoose_2.Prop)({ enum: dog_entity_1.RegistrationStatus, default: dog_entity_1.RegistrationStatus.NOT_STARTED }),
    __metadata("design:type", String)
], Dog.prototype, "registrationStatus", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", Number)
], Dog.prototype, "completedStep", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", Number)
], Dog.prototype, "totalSteps", void 0);
__decorate([
    (0, mongoose_2.Prop)({ enum: questionnaireScreen_fields_entity_1.QuestionnaireScreenName }),
    __metadata("design:type", String)
], Dog.prototype, "nextScreen", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: [questionnaire_screen_schema_1.QuestionnaireScreenSchema] }),
    __metadata("design:type", Array)
], Dog.prototype, "screens", void 0);
exports.Dog = Dog = __decorate([
    (0, mongoose_2.Schema)({
        timestamps: true,
    })
], Dog);
exports.DogSchema = mongoose_2.SchemaFactory.createForClass(Dog);
//# sourceMappingURL=dog.schema.js.map
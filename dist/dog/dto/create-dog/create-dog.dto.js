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
exports.CreateSelectedAvatarDto = exports.CreateLocationDto = exports.CreateColdAdaptDto = exports.CreateHeavyCoatDto = exports.CreateDogSizeDto = exports.CreateDogNameDto = void 0;
const class_validator_1 = require("class-validator");
const dog_entity_1 = require("../../entities/dog.entity");
class CreateDogNameDto {
}
exports.CreateDogNameDto = CreateDogNameDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDogNameDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDogNameDto.prototype, "userId", void 0);
class CreateDogSizeDto {
}
exports.CreateDogSizeDto = CreateDogSizeDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDogSizeDto.prototype, "dogSize", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDogSizeDto.prototype, "dogId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDogSizeDto.prototype, "userId", void 0);
class CreateHeavyCoatDto {
}
exports.CreateHeavyCoatDto = CreateHeavyCoatDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Boolean)
], CreateHeavyCoatDto.prototype, "heavyCoat", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHeavyCoatDto.prototype, "dogId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHeavyCoatDto.prototype, "userId", void 0);
class CreateColdAdaptDto {
}
exports.CreateColdAdaptDto = CreateColdAdaptDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Boolean)
], CreateColdAdaptDto.prototype, "coldAdapt", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateColdAdaptDto.prototype, "dogId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateColdAdaptDto.prototype, "userId", void 0);
class CreateLocationDto {
}
exports.CreateLocationDto = CreateLocationDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "dogId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "userId", void 0);
class CreateSelectedAvatarDto {
}
exports.CreateSelectedAvatarDto = CreateSelectedAvatarDto;
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateSelectedAvatarDto.prototype, "selectedAvatar", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSelectedAvatarDto.prototype, "dogId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSelectedAvatarDto.prototype, "userId", void 0);
//# sourceMappingURL=create-dog.dto.js.map
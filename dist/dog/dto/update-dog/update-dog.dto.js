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
exports.UpdateSelectedAvatarDto = exports.UpdateLocationDto = exports.UpdateColdAdaptDto = exports.UpdateHeavyCoatDto = exports.UpdateDogSizeDto = exports.UpdateDogNameDto = void 0;
const class_validator_1 = require("class-validator");
const create_dog_dto_1 = require("../create-dog/create-dog.dto");
class UpdateDogNameDto extends create_dog_dto_1.CreateDogNameDto {
}
exports.UpdateDogNameDto = UpdateDogNameDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDogNameDto.prototype, "dogId", void 0);
class UpdateDogSizeDto extends create_dog_dto_1.CreateDogSizeDto {
}
exports.UpdateDogSizeDto = UpdateDogSizeDto;
class UpdateHeavyCoatDto extends create_dog_dto_1.CreateHeavyCoatDto {
}
exports.UpdateHeavyCoatDto = UpdateHeavyCoatDto;
class UpdateColdAdaptDto extends create_dog_dto_1.CreateColdAdaptDto {
}
exports.UpdateColdAdaptDto = UpdateColdAdaptDto;
class UpdateLocationDto {
}
exports.UpdateLocationDto = UpdateLocationDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLocationDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLocationDto.prototype, "userId", void 0);
class UpdateSelectedAvatarDto extends create_dog_dto_1.CreateSelectedAvatarDto {
}
exports.UpdateSelectedAvatarDto = UpdateSelectedAvatarDto;
//# sourceMappingURL=update-dog.dto.js.map
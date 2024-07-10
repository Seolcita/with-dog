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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DogController = void 0;
const common_1 = require("@nestjs/common");
const dog_service_1 = require("./dog.service");
let DogController = class DogController {
    constructor(dogService) {
        this.dogService = dogService;
    }
    async createDogName(req) {
        const { name, userId } = req.body;
        if (!name || !userId)
            throw new Error('Missing name or userId');
        return this.dogService.createDogName({ name, userId });
    }
    async createDogSize(req) {
        const { dogId, dogSize, userId } = req.body;
        if (!dogId || !dogSize || !userId)
            throw new Error('Missing dogId, dogSize, or userId');
        const dogOwnerId = await this.dogService.getDogOwnerIdByDogId(dogId);
        if (dogOwnerId !== userId) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        return this.dogService.createDogSize({ dogId, dogSize, userId });
    }
    async createHeavyCoat(req) {
        const { dogId, heavyCoat, userId } = req.body;
        if (!dogId || heavyCoat === undefined || !userId)
            throw new Error('Missing dogId, heavyCoat, or userId');
        const dogOwnerId = await this.dogService.getDogOwnerIdByDogId(dogId);
        if (dogOwnerId !== userId) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        return this.dogService.createHeavyCoat({ dogId, heavyCoat, userId });
    }
    async createColdAdapt(req) {
        const { dogId, coldAdapt, userId } = req.body;
        if (!dogId || coldAdapt === undefined || !userId)
            throw new Error('Missing dogId, coldAdapt, or userId');
        const dogOwnerId = await this.dogService.getDogOwnerIdByDogId(dogId);
        if (dogOwnerId !== userId) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        return this.dogService.createColdAdapt({ dogId, coldAdapt, userId });
    }
    async createLocation(req) {
        const { dogId, location, userId } = req.body;
        if (!dogId || !location || !userId)
            throw new Error('Missing dogId, location, or userId');
        const dogOwnerId = await this.dogService.getDogOwnerIdByDogId(dogId);
        if (dogOwnerId !== userId) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        return this.dogService.createLocation({ dogId, location, userId });
    }
    async createAvatarSelection(req) {
        const { dogId, selectedAvatar, userId } = req.body;
        if (!dogId || !selectedAvatar || !userId)
            throw new Error('Missing dogId, selectedAvatar, or userId');
        const dogOwnerId = await this.dogService.getDogOwnerIdByDogId(dogId);
        if (dogOwnerId !== userId) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        return this.dogService.createAvatarSelection({
            dogId,
            selectedAvatar,
            userId,
        });
    }
    async editDogName(req) {
        const { name, userId, dogId } = req.body;
        if (!name || !userId || !dogId)
            throw new Error('Missing name, userId, or dogId');
        const dogOwnerId = await this.dogService.getDogOwnerIdByDogId(dogId);
        if (dogOwnerId !== userId) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        return this.dogService.updateDogName({ name, userId, dogId });
    }
    async editDogSize(req) {
        const { dogSize, userId, dogId } = req.body;
        if (!dogSize || !userId || !dogId)
            throw new Error('Missing dogSize, userId, or dogId');
        const dogOwnerId = await this.dogService.getDogOwnerIdByDogId(dogId);
        if (dogOwnerId !== userId) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        return this.dogService.updateDogSize({ dogSize, userId, dogId });
    }
    async editHeavyCoat(req) {
        const { heavyCoat, userId, dogId } = req.body;
        if (heavyCoat === undefined || !userId || !dogId)
            throw new Error('Missing heavyCoat, userId, or dogId');
        const dogOwnerId = await this.dogService.getDogOwnerIdByDogId(dogId);
        if (dogOwnerId !== userId) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        return this.dogService.updateHeavyCoat({ heavyCoat, userId, dogId });
    }
    async editColdAdapt(req) {
        const { coldAdapt, userId, dogId } = req.body;
        if (coldAdapt === undefined || !userId || !dogId)
            throw new Error('Missing coldAdapt, userId, or dogId');
        const dogOwnerId = await this.dogService.getDogOwnerIdByDogId(dogId);
        if (dogOwnerId !== userId) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        return this.dogService.updateColdAdapt({ coldAdapt, userId, dogId });
    }
    async editAvatarSelection(req) {
        const { selectedAvatar, userId, dogId } = req.body;
        if (!selectedAvatar || !userId || !dogId)
            throw new Error('Missing selectedAvatar, userId, or dogId');
        const dogOwnerId = await this.dogService.getDogOwnerIdByDogId(dogId);
        if (dogOwnerId !== userId) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        return this.dogService.updateAvatarSelection({
            selectedAvatar,
            userId,
            dogId,
        });
    }
    async editLocation(req) {
        const { location, userId } = req.body;
        if (!location || !userId)
            throw new Error('Missing dogId, location, or userId');
        return this.dogService.updateLocation({ location, userId });
    }
    async deleteDog(req) {
        const { dogId, userId } = req.body;
        if (!dogId || !userId)
            throw new Error('Missing dogId,  or userId');
        const dogOwnerId = await this.dogService.getDogOwnerIdByDogId(dogId);
        if (dogOwnerId !== userId) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        return this.dogService.deleteDog({ dogId, userId });
    }
};
exports.DogController = DogController;
__decorate([
    (0, common_1.Post)('name'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DogController.prototype, "createDogName", null);
__decorate([
    (0, common_1.Post)('dog-size'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DogController.prototype, "createDogSize", null);
__decorate([
    (0, common_1.Post)('heavy-coat'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DogController.prototype, "createHeavyCoat", null);
__decorate([
    (0, common_1.Post)('cold-adapt'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DogController.prototype, "createColdAdapt", null);
__decorate([
    (0, common_1.Post)('location'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DogController.prototype, "createLocation", null);
__decorate([
    (0, common_1.Post)('avatar-selection'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DogController.prototype, "createAvatarSelection", null);
__decorate([
    (0, common_1.Put)('name/edit'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DogController.prototype, "editDogName", null);
__decorate([
    (0, common_1.Put)('dog-size/edit'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DogController.prototype, "editDogSize", null);
__decorate([
    (0, common_1.Put)('heavy-coat/edit'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DogController.prototype, "editHeavyCoat", null);
__decorate([
    (0, common_1.Put)('cold-adapt/edit'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DogController.prototype, "editColdAdapt", null);
__decorate([
    (0, common_1.Put)('avatar-selection/edit'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DogController.prototype, "editAvatarSelection", null);
__decorate([
    (0, common_1.Put)('location/edit'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DogController.prototype, "editLocation", null);
__decorate([
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DogController.prototype, "deleteDog", null);
exports.DogController = DogController = __decorate([
    (0, common_1.Controller)('dog'),
    __param(0, (0, common_1.Inject)('DOG_SERVICE')),
    __metadata("design:paramtypes", [dog_service_1.DogService])
], DogController);
//# sourceMappingURL=dog.controller.js.map
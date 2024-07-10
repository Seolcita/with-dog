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
exports.UserService = void 0;
const mongoose = require("mongoose");
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const user_schema_1 = require("./schemas/user.schema");
const dog_schema_1 = require("../dog/schema/dog.schema");
let UserService = class UserService {
    constructor(userModel, dogModel) {
        this.userModel = userModel;
        this.dogModel = dogModel;
    }
    async getOrCreateUser(userData) {
        const existingUser = await this.userModel.findOne({
            email: userData.email,
        });
        if (existingUser) {
            return this.toObject(existingUser);
        }
        const newUser = await this.userModel.create(userData);
        if (!newUser) {
            throw new common_1.NotFoundException(`Can not create user with user email: ${userData.email}`);
        }
        return this.toObject(newUser);
    }
    async getUserById(id) {
        if (!id || typeof id !== 'string') {
            throw new Error('Invalid id');
        }
        const objectID = new mongoose.Types.ObjectId(id);
        const user = await this.userModel.findById(objectID);
        return this.toObject(user);
    }
    async getUserByEmail(email) {
        if (!email || typeof email !== 'string') {
            throw new Error('Invalid email');
        }
        const user = await this.userModel.findOne({ email });
        return this.toObject(user);
    }
    toObject(document) {
        return {
            id: document._id.toString(),
            email: document.email,
            firstName: document.firstName,
            lastName: document.lastName,
            photoUrl: document.photoUrl,
            location: document.location,
            accessToken: document.accessToken,
            dogs: document.dogs &&
                document.dogs.length > 0 &&
                document.dogs.map((dog) => {
                    return {
                        id: dog._id.toString(),
                        ownerId: dog.ownerId,
                        name: dog.name,
                        dogSize: dog.dogSize,
                        heavyCoat: dog.heavyCoat,
                        coldAdapt: dog.coldAdapt,
                        avatar: dog.avatar,
                        registrationStatus: dog.registrationStatus,
                        completedStep: dog.completedStep,
                        totalSteps: dog.totalSteps,
                        screens: dog.screens,
                        nextScreen: dog.nextScreen,
                    };
                }),
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(dog_schema_1.Dog.name)),
    __metadata("design:paramtypes", [mongoose.Model, mongoose.Model])
], UserService);
//# sourceMappingURL=user.service.js.map
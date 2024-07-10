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
exports.DogService = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const dog_schema_1 = require("./schema/dog.schema");
const user_service_1 = require("../user/user.service");
const user_schema_1 = require("../user/schemas/user.schema");
const dog_entity_1 = require("./entities/dog.entity");
const questionnaire_screen_schema_1 = require("../questionnaire/schema/questionnaire-screen.schema");
const questionnaireScreen_fields_entity_1 = require("../questionnaire/entities/questionnaireScreen-fields.entity");
let DogService = class DogService {
    constructor(userModel, dogModel, questionnaireScreenModel, userService) {
        this.userModel = userModel;
        this.dogModel = dogModel;
        this.questionnaireScreenModel = questionnaireScreenModel;
        this.userService = userService;
    }
    async getDogOwnerIdByDogId(dogId) {
        const dog = await this.dogModel.findById({ _id: dogId });
        if (!dog) {
            throw new common_1.NotFoundException(`Dog not found with id: ${dogId}`);
        }
        return dog.ownerId.toString();
    }
    async createDogName({ name, userId }) {
        const nameQuestionnaireScreen = new this.questionnaireScreenModel({
            nameScreen: {
                step: 1,
                previousScreen: null,
                nextScreen: questionnaireScreen_fields_entity_1.QuestionnaireScreenName.DOG_SIZE_SCREEN,
                isCompleted: true,
            },
        });
        const newDog = new this.dogModel({
            name,
            ownerId: userId,
            registrationStatus: dog_entity_1.RegistrationStatus.IN_PROGRESS,
            completedStep: 1,
            totalSteps: 6,
            screens: [nameQuestionnaireScreen],
            nextScreen: questionnaireScreen_fields_entity_1.QuestionnaireScreenName.DOG_SIZE_SCREEN,
        });
        try {
            await newDog.save();
        }
        catch (err) {
            throw new common_1.InternalServerErrorException('Failed to save dog');
        }
        const user = await this.userModel.findOneAndUpdate({
            _id: userId,
        }, {
            $push: { dogs: newDog },
        }, { new: true });
        const userObject = this.userService.toObject(user);
        return userObject.dogs.find((dog) => dog.id === newDog._id.toString());
    }
    async createDogSize({ dogId, dogSize, userId, }) {
        const dogSizeQuestionnaireScreen = new this.questionnaireScreenModel({
            dogSizeScreen: {
                step: 2,
                previousScreen: questionnaireScreen_fields_entity_1.QuestionnaireScreenName.NAME_SCREEN,
                nextScreen: questionnaireScreen_fields_entity_1.QuestionnaireScreenName.HEAVY_COAT_SCREEN,
                isCompleted: true,
            },
        });
        await this.dogModel.findOneAndUpdate({ _id: dogId }, {
            $set: {
                dogSize,
                nextScreen: questionnaireScreen_fields_entity_1.QuestionnaireScreenName.HEAVY_COAT_SCREEN,
                completedStep: 2,
            },
            $push: { screens: dogSizeQuestionnaireScreen },
        });
        const user = await this.userModel.findOneAndUpdate({ _id: userId }, {
            $push: { 'dogs.$[dog].screens': dogSizeQuestionnaireScreen },
            $set: {
                'dogs.$[dog].dogSize': dogSize,
                'dogs.$[dog].nextScreen': questionnaireScreen_fields_entity_1.QuestionnaireScreenName.HEAVY_COAT_SCREEN,
                'dogs.$[dog].completedStep': 2,
            },
        }, {
            new: true,
            arrayFilters: [{ 'dog._id': dogId }],
        });
        const userObject = this.userService.toObject(user);
        return userObject.dogs.find((dog) => dog.id === dogId);
    }
    async createHeavyCoat({ dogId, heavyCoat, userId, }) {
        const heavyCoatQuestionnaireScreen = new this.questionnaireScreenModel({
            heavyCoatScreen: {
                step: 3,
                previousScreen: questionnaireScreen_fields_entity_1.QuestionnaireScreenName.DOG_SIZE_SCREEN,
                nextScreen: questionnaireScreen_fields_entity_1.QuestionnaireScreenName.COLD_ADAPT_SCREEN,
                isCompleted: true,
            },
        });
        await this.dogModel.findOneAndUpdate({ _id: dogId }, {
            $set: {
                heavyCoat,
                nextScreen: questionnaireScreen_fields_entity_1.QuestionnaireScreenName.COLD_ADAPT_SCREEN,
                completedStep: 3,
            },
            $push: { screens: heavyCoatQuestionnaireScreen },
        });
        const user = await this.userModel.findOneAndUpdate({ _id: userId }, {
            $push: { 'dogs.$[dog].screens': heavyCoatQuestionnaireScreen },
            $set: {
                'dogs.$[dog].heavyCoat': heavyCoat,
                'dogs.$[dog].nextScreen': questionnaireScreen_fields_entity_1.QuestionnaireScreenName.COLD_ADAPT_SCREEN,
                'dogs.$[dog].completedStep': 3,
            },
        }, {
            new: true,
            arrayFilters: [{ 'dog._id': dogId }],
        });
        const userObject = this.userService.toObject(user);
        return userObject.dogs.find((dog) => dog.id === dogId);
    }
    async createColdAdapt({ dogId, coldAdapt, userId, }) {
        const coldAdaptQuestionnaireScreen = new this.questionnaireScreenModel({
            coldAdaptScreen: {
                step: 4,
                previousScreen: questionnaireScreen_fields_entity_1.QuestionnaireScreenName.HEAVY_COAT_SCREEN,
                nextScreen: questionnaireScreen_fields_entity_1.QuestionnaireScreenName.LOCATION_SCREEN,
                isCompleted: true,
            },
        });
        const userData = await this.userModel.findOne({ _id: userId });
        const locationQuestionnaireScreen = new this.questionnaireScreenModel({
            locationScreen: {
                step: 5,
                previousScreen: questionnaireScreen_fields_entity_1.QuestionnaireScreenName.COLD_ADAPT_SCREEN,
                nextScreen: questionnaireScreen_fields_entity_1.QuestionnaireScreenName.AVATAR_SELECTION_SCREEN,
                isCompleted: true,
            },
        });
        await this.dogModel.findOneAndUpdate({ _id: dogId }, {
            $set: {
                coldAdapt,
                nextScreen: userData.location
                    ? questionnaireScreen_fields_entity_1.QuestionnaireScreenName.AVATAR_SELECTION_SCREEN
                    : questionnaireScreen_fields_entity_1.QuestionnaireScreenName.LOCATION_SCREEN,
                completedStep: userData.location ? 5 : 4,
            },
            $push: {
                screens: userData.location
                    ? {
                        $each: [
                            coldAdaptQuestionnaireScreen,
                            locationQuestionnaireScreen,
                        ],
                    }
                    : { $each: [coldAdaptQuestionnaireScreen] },
            },
        });
        const user = await this.userModel.findOneAndUpdate({ _id: userId }, {
            $push: {
                'dogs.$[dog].screens': userData.location
                    ? {
                        $each: [
                            coldAdaptQuestionnaireScreen,
                            locationQuestionnaireScreen,
                        ],
                    }
                    : { $each: [coldAdaptQuestionnaireScreen] },
            },
            $set: {
                'dogs.$[dog].coldAdapt': coldAdapt,
                'dogs.$[dog].nextScreen': userData.location
                    ? questionnaireScreen_fields_entity_1.QuestionnaireScreenName.AVATAR_SELECTION_SCREEN
                    : questionnaireScreen_fields_entity_1.QuestionnaireScreenName.LOCATION_SCREEN,
                'dogs.$[dog].completedStep': userData.location ? 5 : 4,
            },
        }, {
            new: true,
            arrayFilters: [{ 'dog._id': dogId }],
        });
        const userObject = this.userService.toObject(user);
        return userObject.dogs.find((dog) => dog.id === dogId);
    }
    async createLocation({ dogId, location, userId, }) {
        const locationQuestionnaireScreen = new this.questionnaireScreenModel({
            locationScreen: {
                step: 5,
                previousScreen: questionnaireScreen_fields_entity_1.QuestionnaireScreenName.COLD_ADAPT_SCREEN,
                nextScreen: questionnaireScreen_fields_entity_1.QuestionnaireScreenName.AVATAR_SELECTION_SCREEN,
                isCompleted: true,
            },
        });
        await this.dogModel.findOneAndUpdate({ _id: dogId }, {
            $set: {
                location,
                nextScreen: questionnaireScreen_fields_entity_1.QuestionnaireScreenName.AVATAR_SELECTION_SCREEN,
                completedStep: 5,
            },
            $push: { screens: locationQuestionnaireScreen },
        });
        const user = await this.userModel.findOneAndUpdate({ _id: userId }, {
            $push: { 'dogs.$[dog].screens': locationQuestionnaireScreen },
            $set: {
                location,
                'dogs.$[dog].nextScreen': questionnaireScreen_fields_entity_1.QuestionnaireScreenName.AVATAR_SELECTION_SCREEN,
                'dogs.$[dog].completedStep': 5,
            },
        }, {
            new: true,
            arrayFilters: [{ 'dog._id': dogId }],
        });
        const userObject = this.userService.toObject(user);
        return userObject.dogs.find((dog) => dog.id === dogId);
    }
    async createAvatarSelection({ dogId, selectedAvatar, userId, }) {
        const avatarSelectionQuestionnaireScreen = new this.questionnaireScreenModel({
            avatarSelectionScreen: {
                step: 6,
                previousScreen: questionnaireScreen_fields_entity_1.QuestionnaireScreenName.LOCATION_SCREEN,
                nextScreen: questionnaireScreen_fields_entity_1.QuestionnaireScreenName.COMPLETION_SCREEN,
                isCompleted: true,
            },
        });
        await this.dogModel.findOneAndUpdate({ _id: dogId }, {
            $set: {
                avatar: selectedAvatar,
                nextScreen: questionnaireScreen_fields_entity_1.QuestionnaireScreenName.COMPLETION_SCREEN,
                completedStep: 6,
                registrationStatus: dog_entity_1.RegistrationStatus.COMPLETED,
            },
            $push: { screens: avatarSelectionQuestionnaireScreen },
        });
        const user = await this.userModel.findOneAndUpdate({ _id: userId }, {
            $push: { 'dogs.$[dog].screens': avatarSelectionQuestionnaireScreen },
            $set: {
                'dogs.$[dog].avatar': selectedAvatar,
                'dogs.$[dog].nextScreen': questionnaireScreen_fields_entity_1.QuestionnaireScreenName.COMPLETION_SCREEN,
                'dogs.$[dog].completedStep': 6,
                'dogs.$[dog].registrationStatus': dog_entity_1.RegistrationStatus.COMPLETED,
            },
        }, {
            new: true,
            arrayFilters: [{ 'dog._id': dogId }],
        });
        const userObject = this.userService.toObject(user);
        return userObject.dogs.find((dog) => dog.id === dogId);
    }
    async updateDogName({ name, userId, dogId, }) {
        await this.dogModel.findOneAndUpdate({ _id: dogId }, {
            $set: {
                name,
            },
        }, {
            new: true,
        });
        const user = await this.userModel.findOneAndUpdate({ _id: userId }, {
            $set: {
                'dogs.$[dog].name': name,
            },
        }, {
            new: true,
            arrayFilters: [{ 'dog._id': dogId }],
        });
        return this.userService.toObject(user);
    }
    async updateDogSize({ dogSize, userId, dogId, }) {
        await this.dogModel.findOneAndUpdate({ _id: dogId }, {
            $set: {
                dogSize,
            },
        }, {
            new: true,
        });
        const user = await this.userModel.findOneAndUpdate({ _id: userId }, {
            $set: {
                'dogs.$[dog].dogSize': dogSize,
            },
        }, {
            new: true,
            arrayFilters: [{ 'dog._id': dogId }],
        });
        return this.userService.toObject(user);
    }
    async updateHeavyCoat({ heavyCoat, userId, dogId, }) {
        await this.dogModel.findOneAndUpdate({ _id: dogId }, {
            $set: {
                heavyCoat,
            },
        }, {
            new: true,
        });
        const user = await this.userModel.findOneAndUpdate({ _id: userId }, {
            $set: {
                'dogs.$[dog].heavyCoat': heavyCoat,
            },
        }, {
            new: true,
            arrayFilters: [{ 'dog._id': dogId }],
        });
        return this.userService.toObject(user);
    }
    async updateColdAdapt({ coldAdapt, userId, dogId, }) {
        await this.dogModel.findOneAndUpdate({ _id: dogId }, {
            $set: {
                coldAdapt,
            },
        }, {
            new: true,
        });
        const user = await this.userModel.findOneAndUpdate({ _id: userId }, {
            $set: {
                'dogs.$[dog].coldAdapt': coldAdapt,
            },
        }, {
            new: true,
            arrayFilters: [{ 'dog._id': dogId }],
        });
        return this.userService.toObject(user);
    }
    async updateAvatarSelection({ selectedAvatar, userId, dogId, }) {
        await this.dogModel.findOneAndUpdate({ _id: dogId }, {
            $set: {
                avatar: selectedAvatar,
            },
        }, {
            new: true,
        });
        const user = await this.userModel.findOneAndUpdate({ _id: userId }, {
            $set: {
                'dogs.$[dog].avatar': selectedAvatar,
            },
        }, {
            new: true,
            arrayFilters: [{ 'dog._id': dogId }],
        });
        return this.userService.toObject(user);
    }
    async updateLocation({ location, userId, }) {
        const user = await this.userModel.findOneAndUpdate({ _id: userId }, {
            $set: {
                location,
            },
        }, {
            new: true,
        });
        return this.userService.toObject(user);
    }
    async deleteDog({ dogId, userId }) {
        await this.dogModel.deleteOne({ _id: dogId }, {
            new: true,
        });
        const user = await this.userModel.findOneAndUpdate({ _id: userId }, {
            $pull: {
                dogs: { _id: dogId },
            },
        }, {
            new: true,
        });
        return this.userService.toObject(user);
    }
};
exports.DogService = DogService;
exports.DogService = DogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_2.InjectModel)(dog_schema_1.Dog.name)),
    __param(2, (0, mongoose_2.InjectModel)(questionnaire_screen_schema_1.QuestionnaireScreen.name)),
    __param(3, (0, common_1.Inject)('USER_SERVICE')),
    __metadata("design:paramtypes", [mongoose_1.default.Model, mongoose_1.default.Model, mongoose_1.default.Model, user_service_1.UserService])
], DogService);
//# sourceMappingURL=dog.service.js.map
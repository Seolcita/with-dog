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
import mongoose from 'mongoose';
import { CreateColdAdaptDto, CreateDogNameDto, CreateDogSizeDto, CreateHeavyCoatDto, CreateLocationDto, CreateSelectedAvatarDto } from './dto/create-dog/create-dog.dto';
import { UpdateColdAdaptDto, UpdateDogNameDto, UpdateDogSizeDto, UpdateHeavyCoatDto, UpdateLocationDto, UpdateSelectedAvatarDto } from './dto/update-dog/update-dog.dto';
import { Dog } from './schema/dog.schema';
import { UserService } from '../user/user.service';
import { User } from '../user/schemas/user.schema';
import { DeleteDogDto } from './dto/delete-dog/delete-dog.dto';
import { UserProfile } from '../user/entities/user.entity';
import { DogProfile } from './entities/dog.entity';
import { QuestionnaireScreen } from '../questionnaire/schema/questionnaire-screen.schema';
export declare class DogService {
    private userModel;
    private dogModel;
    private questionnaireScreenModel;
    private userService;
    constructor(userModel: mongoose.Model<User>, dogModel: mongoose.Model<Dog>, questionnaireScreenModel: mongoose.Model<QuestionnaireScreen>, userService: UserService);
    getDogOwnerIdByDogId(dogId: string): Promise<string>;
    createDogName({ name, userId }: CreateDogNameDto): Promise<DogProfile>;
    createDogSize({ dogId, dogSize, userId, }: CreateDogSizeDto): Promise<DogProfile>;
    createHeavyCoat({ dogId, heavyCoat, userId, }: CreateHeavyCoatDto): Promise<DogProfile>;
    createColdAdapt({ dogId, coldAdapt, userId, }: CreateColdAdaptDto): Promise<DogProfile>;
    createLocation({ dogId, location, userId, }: CreateLocationDto): Promise<DogProfile>;
    createAvatarSelection({ dogId, selectedAvatar, userId, }: CreateSelectedAvatarDto): Promise<DogProfile>;
    updateDogName({ name, userId, dogId, }: UpdateDogNameDto): Promise<UserProfile>;
    updateDogSize({ dogSize, userId, dogId, }: UpdateDogSizeDto): Promise<UserProfile>;
    updateHeavyCoat({ heavyCoat, userId, dogId, }: UpdateHeavyCoatDto): Promise<UserProfile>;
    updateColdAdapt({ coldAdapt, userId, dogId, }: UpdateColdAdaptDto): Promise<UserProfile>;
    updateAvatarSelection({ selectedAvatar, userId, dogId, }: UpdateSelectedAvatarDto): Promise<UserProfile>;
    updateLocation({ location, userId, }: UpdateLocationDto): Promise<UserProfile>;
    deleteDog({ dogId, userId }: DeleteDogDto): Promise<UserProfile>;
}

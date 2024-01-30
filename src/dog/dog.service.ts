import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import {
  CreateColdAdaptDto,
  CreateDogNameDto,
  CreateDogSizeDto,
  CreateHeavyCoatDto,
  CreateLocationDto,
  CreateSelectedAvatarDto,
} from './dto/create-dog/create-dog.dto';
import {
  UpdateColdAdaptDto,
  UpdateDogNameDto,
  UpdateDogSizeDto,
  UpdateHeavyCoatDto,
  UpdateLocationDto,
  UpdateSelectedAvatarDto,
} from './dto/update-dog/update-dog.dto';
import { Dog } from './schema/dog.schema';
import { UserService } from '../user/user.service';
import { User } from '../user/schemas/user.schema';
import { DeleteDogDto } from './dto/delete-dog/delete-dog.dto';
import { UserDocument, UserProfile } from '../user/entities/user.entity';
import { DogProfile, RegistrationStatus } from './entities/dog.entity';
import { QuestionnaireScreen } from '../questionnaire/schema/questionnaire-screen.schema';
import { QuestionnaireScreenName } from '../questionnaire/entities/questionnaireScreen-fields.entity';

@Injectable()
export class DogService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
    @InjectModel(Dog.name) private dogModel: mongoose.Model<Dog>,
    @InjectModel(QuestionnaireScreen.name)
    private questionnaireScreenModel: mongoose.Model<QuestionnaireScreen>,
    @Inject('USER_SERVICE') private userService: UserService,
  ) {}

  async createDogName({ name, userId }: CreateDogNameDto): Promise<DogProfile> {
    // Create new dog with name
    const newDog = new this.dogModel({
      name,
      ownerId: userId,
      registrationStatus: RegistrationStatus.IN_PROGRESS,
      completedStep: 1,
      totalSteps: 6,
    });

    // Add new dog to user
    try {
      await this.userModel.findOneAndUpdate(
        {
          _id: userId,
        },
        {
          $push: { dogs: newDog },
        },
        { new: true },
      );
    } catch (err) {
      throw new NotFoundException(`User not found with id: ${userId}`);
    }

    // Create new questionnaire name screen
    const nameQuestionnaireScreen = new this.questionnaireScreenModel({
      nameScreen: {
        step: 1,
        previousScreen: null,
        nextScreen: QuestionnaireScreenName.DOG_SIZE_SCREEN,
        isCompleted: true,
      },
    });

    // Add questionnaire name screen to dog which matches with new dog id
    const user = await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        $push: { 'dogs.$[dog].screens': nameQuestionnaireScreen },
        $set: {
          'dogs.$[dog].nextScreen': QuestionnaireScreenName.DOG_SIZE_SCREEN,
        },
      },
      {
        new: true,
        arrayFilters: [{ 'dog._id': newDog._id }],
      },
    );

    const userObject = this.userService.toObject(user as UserDocument);
    return (userObject.dogs as DogProfile[]).find(
      (dog) => dog.id === newDog._id.toString(),
    );
  }

  async createDogSize({
    dogId,
    dogSize,
    userId,
  }: CreateDogSizeDto): Promise<DogProfile> {
    // Create new questionnaire dog size screen
    const dogSizeQuestionnaireScreen = new this.questionnaireScreenModel({
      dogSizeScreen: {
        step: 2,
        previousScreen: QuestionnaireScreenName.NAME_SCREEN,
        nextScreen: QuestionnaireScreenName.HEAVY_COAT_SCREEN,
        isCompleted: true,
      },
    });

    // Add questionnaire dog size screen and dog size data to dog which matches with dog id
    const user = await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        $push: { 'dogs.$[dog].screens': dogSizeQuestionnaireScreen },
        $set: {
          'dogs.$[dog].dogSize': dogSize,
          'dogs.$[dog].nextScreen': QuestionnaireScreenName.HEAVY_COAT_SCREEN,
          'dogs.$[dog].completedStep': 2,
        },
      },
      {
        new: true,
        arrayFilters: [{ 'dog._id': dogId }],
      },
    );

    const userObject = this.userService.toObject(user as UserDocument);

    return (userObject.dogs as DogProfile[]).find((dog) => dog.id === dogId);
  }

  async createHeavyCoat({
    dogId,
    heavyCoat,
    userId,
  }: CreateHeavyCoatDto): Promise<DogProfile> {
    // Create new questionnaire heavy coat screen
    const heavyCoatQuestionnaireScreen = new this.questionnaireScreenModel({
      heavyCoatScreen: {
        step: 3,
        previousScreen: QuestionnaireScreenName.DOG_SIZE_SCREEN,
        nextScreen: QuestionnaireScreenName.COLD_ADAPT_SCREEN,
        isCompleted: true,
      },
    });

    // Add questionnaire heavy coat screen and heavy coat data to dog which matches with dog id
    const user = await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        $push: { 'dogs.$[dog].screens': heavyCoatQuestionnaireScreen },
        $set: {
          'dogs.$[dog].heavyCoat': heavyCoat,
          'dogs.$[dog].nextScreen': QuestionnaireScreenName.COLD_ADAPT_SCREEN,
          'dogs.$[dog].completedStep': 3,
        },
      },
      {
        new: true,
        arrayFilters: [{ 'dog._id': dogId }],
      },
    );

    const userObject = this.userService.toObject(user as UserDocument);

    return (userObject.dogs as DogProfile[]).find((dog) => dog.id === dogId);
  }

  async createColdAdapt({
    dogId,
    coldAdapt,
    userId,
  }: CreateColdAdaptDto): Promise<DogProfile> {
    // Create new questionnaire cold adapt screen
    const heavyCoatQuestionnaireScreen = new this.questionnaireScreenModel({
      coldAdaptScreen: {
        step: 4,
        previousScreen: QuestionnaireScreenName.HEAVY_COAT_SCREEN,
        nextScreen: QuestionnaireScreenName.AVATAR_SELECTION_SCREEN,
        isCompleted: true,
      },
    });

    // Add questionnaire cold adapt screen and cold adapt data to dog which matches with dog id
    const user = await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        $push: { 'dogs.$[dog].screens': heavyCoatQuestionnaireScreen },
        $set: {
          'dogs.$[dog].coldAdapt': coldAdapt,
          'dogs.$[dog].nextScreen': QuestionnaireScreenName.LOCATION_SCREEN,
          'dogs.$[dog].completedStep': 4,
        },
      },
      {
        new: true,
        arrayFilters: [{ 'dog._id': dogId }],
      },
    );

    const userObject = this.userService.toObject(user as UserDocument);

    return (userObject.dogs as DogProfile[]).find((dog) => dog.id === dogId);
  }

  async createLocation({
    dogId,
    location,
    userId,
  }: CreateLocationDto): Promise<DogProfile> {
    // Create new questionnaire location screen
    const locationQuestionnaireScreen = new this.questionnaireScreenModel({
      locationScreen: {
        step: 5,
        previousScreen: QuestionnaireScreenName.COLD_ADAPT_SCREEN,
        nextScreen: QuestionnaireScreenName.AVATAR_SELECTION_SCREEN,
        isCompleted: true,
      },
    });

    // Add questionnaire location screen and location data to dog which matches with dog id
    const user = await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        $push: { 'dogs.$[dog].screens': locationQuestionnaireScreen },
        $set: {
          location,
          'dogs.$[dog].nextScreen':
            QuestionnaireScreenName.AVATAR_SELECTION_SCREEN,
          'dogs.$[dog].completedStep': 5,
        },
      },
      {
        new: true,
        arrayFilters: [{ 'dog._id': dogId }],
      },
    );

    const userObject = this.userService.toObject(user as UserDocument);

    return (userObject.dogs as DogProfile[]).find((dog) => dog.id === dogId);
  }

  async createAvatarSelection({
    dogId,
    selectedAvatar,
    userId,
  }: CreateSelectedAvatarDto): Promise<DogProfile> {
    // Create new questionnaire avatar selection screen
    const AvatarSelectionQuestionnaireScreen =
      new this.questionnaireScreenModel({
        avatarSelectionScreen: {
          step: 6,
          previousScreen: QuestionnaireScreenName.LOCATION_SCREEN,
          nextScreen: QuestionnaireScreenName.COMPLETION_SCREEN,
          isCompleted: true,
        },
      });

    // Add questionnaire avatar selection screen and avatar selection data to dog which matches with dog id
    const user = await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        $push: { 'dogs.$[dog].screens': AvatarSelectionQuestionnaireScreen },
        $set: {
          'dogs.$[dog].avatar': selectedAvatar,
          'dogs.$[dog].nextScreen': QuestionnaireScreenName.COMPLETION_SCREEN,
          'dogs.$[dog].completedStep': 6,
          'dogs.$[dog].registrationStatus': RegistrationStatus.COMPLETED,
        },
      },
      {
        new: true,
        arrayFilters: [{ 'dog._id': dogId }],
      },
    );

    const userObject = this.userService.toObject(user as UserDocument);

    return (userObject.dogs as DogProfile[]).find((dog) => dog.id === dogId);
  }

  async updateDogName({
    name,
    userId,
    dogId,
  }: UpdateDogNameDto): Promise<UserProfile> {
    const user = await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          'dogs.$[dog].name': name,
        },
      },
      {
        new: true,
        arrayFilters: [{ 'dog._id': dogId }],
      },
    );

    return this.userService.toObject(user as UserDocument);
  }

  async updateDogSize({
    dogSize,
    userId,
    dogId,
  }: UpdateDogSizeDto): Promise<UserProfile> {
    const user = await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          'dogs.$[dog].dogSize': dogSize,
        },
      },
      {
        new: true,
        arrayFilters: [{ 'dog._id': dogId }],
      },
    );

    return this.userService.toObject(user as UserDocument);
  }

  async updateHeavyCoat({
    heavyCoat,
    userId,
    dogId,
  }: UpdateHeavyCoatDto): Promise<UserProfile> {
    const user = await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          'dogs.$[dog].heavyCoat': heavyCoat,
        },
      },
      {
        new: true,
        arrayFilters: [{ 'dog._id': dogId }],
      },
    );

    return this.userService.toObject(user as UserDocument);
  }

  async updateColdAdapt({
    coldAdapt,
    userId,
    dogId,
  }: UpdateColdAdaptDto): Promise<UserProfile> {
    const user = await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          'dogs.$[dog].coldAdapt': coldAdapt,
        },
      },
      {
        new: true,
        arrayFilters: [{ 'dog._id': dogId }],
      },
    );

    return this.userService.toObject(user as UserDocument);
  }

  async updateAvatarSelection({
    selectedAvatar,
    userId,
    dogId,
  }: UpdateSelectedAvatarDto): Promise<UserProfile> {
    const user = await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          'dogs.$[dog].avatar': selectedAvatar,
        },
      },
      {
        new: true,
        arrayFilters: [{ 'dog._id': dogId }],
      },
    );

    return this.userService.toObject(user as UserDocument);
  }

  async updateLocation({
    location,
    userId,
  }: UpdateLocationDto): Promise<UserProfile> {
    const user = await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          location,
        },
      },
      {
        new: true,
      },
    );

    return this.userService.toObject(user as UserDocument);
  }

  async deleteDog({ dogId, userId }: DeleteDogDto): Promise<UserProfile> {
    const user = await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        $pull: {
          dogs: { _id: dogId },
        },
      },
      {
        new: true,
      },
    );

    return this.userService.toObject(user as UserDocument);
  }
}

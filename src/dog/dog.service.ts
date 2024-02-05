import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

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

  async getDogOwnerIdByDogId(dogId: string): Promise<string> {
    const dog = await this.dogModel.findById({ _id: dogId });

    if (!dog) {
      throw new NotFoundException(`Dog not found with id: ${dogId}`);
    }
    return dog.ownerId.toString();
  }

  async createDogName({ name, userId }: CreateDogNameDto): Promise<DogProfile> {
    // Create new questionnaire name screen
    const nameQuestionnaireScreen = new this.questionnaireScreenModel({
      nameScreen: {
        step: 1,
        previousScreen: null,
        nextScreen: QuestionnaireScreenName.DOG_SIZE_SCREEN,
        isCompleted: true,
      },
    });

    // Create new dog with name
    const newDog = new this.dogModel({
      name,
      ownerId: userId,
      registrationStatus: RegistrationStatus.IN_PROGRESS,
      completedStep: 1,
      totalSteps: 6,
      screens: [nameQuestionnaireScreen],
      nextScreen: QuestionnaireScreenName.DOG_SIZE_SCREEN,
    });

    // Save new dog to dogModel
    try {
      await newDog.save();
    } catch (err) {
      throw new InternalServerErrorException('Failed to save dog');
    }

    // Add new dog to user
    const user = await this.userModel.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $push: { dogs: newDog },
      },
      { new: true },
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

    // Add the dog size to dog which matches with dog id
    await this.dogModel.findOneAndUpdate(
      { _id: dogId },
      {
        $set: {
          dogSize,
          nextScreen: QuestionnaireScreenName.HEAVY_COAT_SCREEN,
          completedStep: 2,
        },
        $push: { screens: dogSizeQuestionnaireScreen },
      },
    );

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

    // Add the heavyCoat to dog which matches with dog id
    await this.dogModel.findOneAndUpdate(
      { _id: dogId },
      {
        $set: {
          heavyCoat,
          nextScreen: QuestionnaireScreenName.COLD_ADAPT_SCREEN,
          completedStep: 3,
        },
        $push: { screens: heavyCoatQuestionnaireScreen },
      },
    );

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
    const coldAdaptQuestionnaireScreen = new this.questionnaireScreenModel({
      coldAdaptScreen: {
        step: 4,
        previousScreen: QuestionnaireScreenName.HEAVY_COAT_SCREEN,
        nextScreen: QuestionnaireScreenName.LOCATION_SCREEN,
        isCompleted: true,
      },
    });

    // Add the coldAdapt to dog which matches with dog id
    await this.dogModel.findOneAndUpdate(
      { _id: dogId },
      {
        $set: {
          coldAdapt,
          nextScreen: QuestionnaireScreenName.LOCATION_SCREEN,
          completedStep: 4,
        },
        $push: { screens: coldAdaptQuestionnaireScreen },
      },
    );

    // Add questionnaire coldAdapt screen and coldAdapt data to dog which matches with dog id
    const user = await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        $push: { 'dogs.$[dog].screens': coldAdaptQuestionnaireScreen },
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

    // Add the location to dog which matches with dog id
    await this.dogModel.findOneAndUpdate(
      { _id: dogId },
      {
        $set: {
          location,
          nextScreen: QuestionnaireScreenName.AVATAR_SELECTION_SCREEN,
          completedStep: 5,
        },
        $push: { screens: locationQuestionnaireScreen },
      },
    );

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
    const avatarSelectionQuestionnaireScreen =
      new this.questionnaireScreenModel({
        avatarSelectionScreen: {
          step: 6,
          previousScreen: QuestionnaireScreenName.LOCATION_SCREEN,
          nextScreen: QuestionnaireScreenName.COMPLETION_SCREEN,
          isCompleted: true,
        },
      });

    // Add selected avatar to dog which matches with dog id
    await this.dogModel.findOneAndUpdate(
      { _id: dogId },
      {
        $set: {
          avatar: selectedAvatar,
          nextScreen: QuestionnaireScreenName.COMPLETION_SCREEN,
          completedStep: 6,
          registrationStatus: RegistrationStatus.COMPLETED,
        },
        $push: { screens: avatarSelectionQuestionnaireScreen },
      },
    );

    // Add questionnaire avatar selection screen and avatar selection data to dog which matches with dog id
    const user = await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        $push: { 'dogs.$[dog].screens': avatarSelectionQuestionnaireScreen },
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
    // update the dog name to dog which matches with dog id
    await this.dogModel.findOneAndUpdate(
      { _id: dogId },
      {
        $set: {
          name,
        },
      },
      {
        new: true,
      },
    );

    // update the dog name to user which matches with user id and dog id
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
    // update the dog size to dog which matches with dog id
    await this.dogModel.findOneAndUpdate(
      { _id: dogId },
      {
        $set: {
          dogSize,
        },
      },
      {
        new: true,
      },
    );

    // update the dog size to user which matches with user id and dog id
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
    // update the heavy coat to dog which matches with dog id
    await this.dogModel.findOneAndUpdate(
      { _id: dogId },
      {
        $set: {
          heavyCoat,
        },
      },
      {
        new: true,
      },
    );

    // update the heavy coat to user which matches with user id and dog id
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
    // update the cold adapt to dog which matches with dog id
    await this.dogModel.findOneAndUpdate(
      { _id: dogId },
      {
        $set: {
          coldAdapt,
        },
      },
      {
        new: true,
      },
    );

    // update the cold adapt to user which matches with user id and dog id
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
    // update the avatar to dog which matches with dog id
    await this.dogModel.findOneAndUpdate(
      { _id: dogId },
      {
        $set: {
          avatar: selectedAvatar,
        },
      },
      {
        new: true,
      },
    );

    // update the avatar to user which matches with user id and dog id
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
    // update the location to user which matches with user id
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
    // Delete dog under which matches with dog id
    await this.dogModel.deleteOne(
      { _id: dogId },
      {
        new: true,
      },
    );

    // Delete dog under user which matches with user id and dog id
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

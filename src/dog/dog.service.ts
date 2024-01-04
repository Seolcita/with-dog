import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import {
  CreateDogNameDto,
  CreateDogSizeDto,
  CreateHeavyCoatDto,
} from './dto/create-dog/create-dog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/schemas/user.schema';
import mongoose from 'mongoose';
import { Dog } from './schema/dog.schema';
import { QuestionnaireScreenFields } from '../questionnaire/schema/questionnaire-screen-fields.schema';
import { QuestionnaireScreen } from '../questionnaire/schema/questionnaire-screen.schema';
import { QuestionnaireScreenName } from '../questionnaire/entities/questionnaireScreen-fields.entity';
import { UserDocument } from '../user/entities/user.entity';

@Injectable()
export class DogService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
    @InjectModel(Dog.name) private dogModel: mongoose.Model<Dog>,
    @InjectModel(QuestionnaireScreen.name)
    private questionnaireScreenModel: mongoose.Model<QuestionnaireScreen>,
    @InjectModel(QuestionnaireScreenFields.name)
    private questionnaireScreenModelFields: mongoose.Model<QuestionnaireScreen>,
    @Inject('USER_SERVICE') private userService: UserService,
  ) {}

  async createDogName({ name, userId }: CreateDogNameDto) {
    // Create new dog with name
    const newDog = new this.dogModel({
      name,
      ownerId: userId,
      registrationStatus: 'IN_PROGRESS',
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
      console.log(err);
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
    const result = userObject.dogs.find(
      (dog) => dog.id === newDog._id.toString(),
    );

    return result;
  }

  async createDogSize({ dogId, dogSize, userId }: CreateDogSizeDto) {
    // Create new questionnaire dog size screen
    const dogSizeQuestionnaireScreen = new this.questionnaireScreenModel({
      dogSizeScreen: {
        step: 2,
        previousScreen: QuestionnaireScreenName.NAME_SCREEN,
        nextScreen: QuestionnaireScreenName.HEAVY_COAT_SCREEN,
        isCompleted: true,
      },
    });

    // Add questionnaire dog size screen and dog size to dog which matches with dog id
    const user = await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        $push: { 'dogs.$[dog].screens': dogSizeQuestionnaireScreen },
        $set: {
          'dogs.$[dog].nextScreen': QuestionnaireScreenName.HEAVY_COAT_SCREEN,
          'dogs.$[dog].dogSize': dogSize,
        },
      },
      {
        new: true,
        arrayFilters: [{ 'dog._id': dogId }],
      },
    );

    const userObject = this.userService.toObject(user as UserDocument);
    const result = userObject.dogs.find((dog) => dog.id === dogId);

    return result;
  }

  async createHeavyCoat({ dogId, heavyCoat, userId }: CreateHeavyCoatDto) {
    // Create new questionnaire dog size screen
    const heavyCoatQuestionnaireScreen = new this.questionnaireScreenModel({
      dogSizeScreen: {
        step: 3,
        previousScreen: QuestionnaireScreenName.DOG_SIZE_SCREEN,
        nextScreen: QuestionnaireScreenName.COLD_ADAPT_SCREEN,
        isCompleted: true,
      },
    });

    // Add questionnaire dog size screen and dog size to dog which matches with dog id
    const user = await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        $push: { 'dogs.$[dog].screens': heavyCoatQuestionnaireScreen },
        $set: {
          'dogs.$[dog].nextScreen': QuestionnaireScreenName.COLD_ADAPT_SCREEN,
          'dogs.$[dog].heavyCoat': heavyCoat,
        },
      },
      {
        new: true,
        arrayFilters: [{ 'dog._id': dogId }],
      },
    );

    const userObject = this.userService.toObject(user as UserDocument);

    return (
      userObject.dogs.length > 0 &&
      userObject.dogs.find((dog) => dog.id === dogId)
    );
  }
}

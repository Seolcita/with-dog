import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateDogNameDto } from './dto/create-dog/create-dog-name.dto';
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
    console.log('🤬', name, userId);
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
    try {
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

      if (!user) {
        throw new NotFoundException(`User not found with id: ${userId}`);
      }

      console.log('🤬', user);
      return this.userService.toObject(user as UserDocument);
      // const result = userObject.dogs.find(
      //   (dog) => dog.id === newDog._id.toString(),
      // );

      // console.log('🤬🤬🤬', result);
      // return result;
    } catch (err) {
      console.log(err);
      throw new Error('Error while adding questionnaire name screen to dog');
    }
  }
}

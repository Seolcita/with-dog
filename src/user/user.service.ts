import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { UserDocument, UserProfile } from './entities/user.entity';
import { Dog } from '../dog/schema/dog.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
    @InjectModel(Dog.name) private dogModel: mongoose.Model<Dog>,
  ) {}

  async getOrCreateUser(userData: CreateUserDto): Promise<UserProfile> {
    const existingUser = await this.userModel.findOne({
      email: userData.email,
    });

    if (existingUser) {
      return this.toObject(existingUser as UserDocument);
    }

    const newUser = await this.userModel.create(userData);
    if (!newUser) {
      throw new NotFoundException(
        `Can not create user with user email: ${userData.email}`,
      );
    }

    return this.toObject(newUser as UserDocument);
  }

  async getUserById(id: string): Promise<UserProfile> {
    if (id === undefined) {
      throw new Error('Invalid id');
    }

    const objectID = new mongoose.Types.ObjectId(id);
    const user = await this.userModel.findById(objectID);
    return this.toObject(user as UserDocument);
  }

  public toObject(document: UserDocument): UserProfile {
    return {
      id: document._id.toString(),
      email: document.email,
      firstName: document.firstName,
      lastName: document.lastName,
      photoUrl: document.photoUrl,
      location: document.location,
      dogs:
        document.dogs &&
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
            screens: dog.screens,
            nextScreen: dog.nextScreen,
          };
        }),
    };
  }
}

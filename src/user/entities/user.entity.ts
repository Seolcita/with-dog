import { Document, Types } from 'mongoose';

import { DogDocument, DogProfile } from '../../dog/entities/dog.entity';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  location: string;
  accessToken: string;
  dogs: DogProfile[] | [];
}

export interface UserDocument
  extends Omit<UserProfile, 'id'>,
    DogDocument,
    Document {
  _id: Types.ObjectId;
}

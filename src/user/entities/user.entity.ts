import { Document, Types } from 'mongoose';

export interface UserProfile {
  id: string;
  email: string;
}

export interface UserDocument extends Omit<UserProfile, 'id'>, Document {
  _id: Types.ObjectId;
}

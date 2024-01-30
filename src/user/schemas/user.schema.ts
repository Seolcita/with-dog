import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Dog, DogSchema } from '../../dog/schema/dog.schema';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ unique: true, index: true })
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  photoUrl: string;

  @Prop()
  location: string;

  @Prop({ type: [DogSchema], default: [] })
  dogs: Dog[];
}

export const UserSchema = SchemaFactory.createForClass(User);

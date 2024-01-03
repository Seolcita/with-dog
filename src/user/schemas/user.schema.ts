import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Dog, DogSchema } from '../../dog/schema/dog.schema';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  email: string;

  @Prop({ type: [DogSchema], default: [] })
  dogs: Dog[];
}

export const UserSchema = SchemaFactory.createForClass(User);

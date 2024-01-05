import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import mongoose from 'mongoose';
import { Note } from './note.schema';

// export type CatDocument = HydratedDocument<Cat>;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;
  @Prop({ default: false })
  isActivated: boolean;

  @Prop({ required: true })
  activationLink: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }] })
  createdNotes: Types.ObjectId[];

  // @Prop({required: false})
  // _id: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);

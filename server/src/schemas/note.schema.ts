import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId, Types } from 'mongoose';
export enum accessTypes {
  link = 'LINK',
  private = 'PRIVATE',
}
@Schema()
export class Note {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  text: string;
  @Prop({ required: true })
  authorId: mongoose.Schema.Types.ObjectId;
  @Prop({ required: true })
  access: accessTypes;

}
export const NoteSchema = SchemaFactory.createForClass(Note);

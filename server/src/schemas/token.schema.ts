import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "./user.schema";
@Schema()
export class Token{
  @Prop({ref : 'User'})
  user : mongoose.Schema.Types.ObjectId

  @Prop({required : true})
  refreshToken : string

}
export const TokenSchema = SchemaFactory.createForClass(Token);
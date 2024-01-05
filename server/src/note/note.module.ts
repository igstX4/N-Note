import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Note, NoteSchema } from "../schemas/note.schema";
import { NoteService } from "./note.service";
import { NoteController } from "./note.controller";
import { User, UserSchema } from "../schemas/user.schema";
import { TokenService } from "../token/token.service";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { Token, TokenSchema } from "../schemas/token.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }, {name: User.name, schema: UserSchema}, {name : Token.name, schema: TokenSchema}]),
    ConfigModule, JwtModule
  ],

  providers: [NoteService, TokenService],
  controllers: [NoteController]
})
export class NoteModule {
}

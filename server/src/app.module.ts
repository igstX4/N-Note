import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NoteController } from './note/note.controller';
import { AuthModule } from './auth/auth.module';
import { configMongo } from './auth/configs/mongo.config';
import { NoteModule } from './note/note.module';
import { TokenService } from './token/token.service';
import { MailService } from './mail/mail.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { JwtModule } from "@nestjs/jwt";
import { jwtConfig } from "./auth/configs/jwt.config";

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: configMongo,
    }),

    NoteModule,
    UserModule,
  ],
  providers: [],
})
export class AppModule {}

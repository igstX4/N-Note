import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../schemas/user.schema";
import { Token, TokenSchema } from "../schemas/token.schema";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { configMailer } from "../auth/configs/mailer.config";
import { JwtModule } from "@nestjs/jwt";
import { jwtConfig } from "../auth/configs/jwt.config";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { MailService } from "../mail/mail.service";
import { TokenService } from "../token/token.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: configMailer
    }),
    JwtModule.registerAsync({
      imports: [
        ConfigModule
      ],
      inject: [ConfigService],
      useFactory: jwtConfig
    }),

    PassportModule, ConfigModule],
  providers: [UserService, JwtStrategy, MailService, TokenService],
  controllers: [UserController]
})
export class UserModule {
}

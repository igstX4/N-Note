import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtConfig } from './configs/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../user/jwt.strategy';
import { MailService } from '../mail/mail.service';
import { Token, TokenSchema } from '../schemas/token.schema';
import { TokenService } from '../token/token.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { configMailer } from './configs/mailer.config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: configMailer,
    }),
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: jwtConfig,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, TokenService],
})
export class AuthModule {}

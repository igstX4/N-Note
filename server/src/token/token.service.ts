import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Token } from "../schemas/token.schema";
import mongoose, { Model, Types } from "mongoose";

@Injectable()
export class TokenService {
  constructor(private configService: ConfigService,
              private jwtService: JwtService,
              @InjectModel(Token.name) private tokenModel: Model<Token>
  ) {
  }

  async generateTokens(payload: { email: string, id: Types.ObjectId, isActivated: boolean }) {
    const accessToken = this.jwtService.sign(payload, { secret: this.configService.get("JWT_KEY"), expiresIn: "30m" });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get("JWT_REFRESH_KEY"),
      expiresIn: "30d"
    });

    return {
      accessToken,
      refreshToken
    };
  }

  async validateAccessToken(token) {

    try {
      const userData = this.jwtService.verify(token, {secret: this.configService.get('JWT_KEY')})
      if (userData) {
        return userData
      }
      return null
    } catch (e) {
      return null
    }
  }
  validateRefreshToken(token){
    try {
      const userData = this.jwtService.verify(token, {secret: this.configService.get('JWT_REFRESH_KEY')})
      if (userData) {
        return userData
      }
      return null
    } catch (e) {
      return null
    }

  }

 
  async saveToken(userId, refreshToken) {
    const tokenData = await this.tokenModel.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await this.tokenModel.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await this.tokenModel.deleteOne({ refreshToken });
    return tokenData;
  }
  async findToken(refreshToken) {
    const tokenData = await this.tokenModel.findOne({ refreshToken });
    return tokenData;
  }
}

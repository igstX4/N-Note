import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { loginDto } from './dto/login.dto';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async login({ email, password }: loginDto) {
    const user = await this.userModel
      .findOne({ email })
      .populate('createdNotes');

    if (!user) {
      throw new UnauthorizedException('wrong email or password');
    }

    const isCorrectPassword = await compare(password, user.passwordHash);

    if (!isCorrectPassword) {
      throw new UnauthorizedException('wrong email or password');
    }

    const tokens = await this.tokenService.generateTokens({
      email: user.email,
      id: user._id,
      isActivated: user.isActivated,
    });
    await this.tokenService.saveToken(user._id, tokens.refreshToken);
    return {
      ...tokens,
      user: {
        email: user.email,
        id: user._id,
        isActivated: user.isActivated,
        createdNotes: user.createdNotes,
        username: user.username,
      },
    };
  }
  async logout(refreshToken) {
    return await this.tokenService.removeToken(refreshToken);
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new UnauthorizedException('');
    }
    const userData = await this.tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = this.tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw new UnauthorizedException();
    }
    const user = await this.userModel.findById(userData.id);
    const tokens = await this.tokenService.generateTokens({
      email: user.email,
      id: user._id,
      isActivated: user.isActivated,
    });
    await this.tokenService.saveToken(user._id, tokens.refreshToken);
    return {
      ...tokens,
      user: { email: user.email, id: user._id, isActivated: user.isActivated },
    };
  }
}

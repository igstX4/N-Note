import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { createUserDto } from './dto/createUser.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model, Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { TokenService } from '../token/token.service';
import { ConfigService } from '@nestjs/config';
import { compare, genSalt, hash } from 'bcrypt';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {}

  async createUser(dto: createUserDto) {
    const salt = await genSalt(10);
    const hashedPassword = await hash(dto.password, salt);
    const activationLink = uuidv4();
    const findUser = await this.userModel.findOne({ email: dto.email });
    console.log(findUser);
    if (findUser) {
      throw new BadRequestException('User already exists');
    }
    const user = new this.userModel({
      email: dto.email,
      username: dto.username,
      passwordHash: hashedPassword,
      activationLink,
    });
    const savedUser = await user.save();
    await this.mailService.sendActivationMail(
      dto.email,
      `${this.configService.get('API_URL')}/user/activate/${activationLink}`,
    );
    const tokens = await this.tokenService.generateTokens({
      email: savedUser.email,
      id: savedUser._id,
      isActivated: savedUser.isActivated,
    });
    await this.tokenService.saveToken(savedUser._id, tokens.refreshToken);
    return {
      ...tokens,
      user: {
        createdNotes: savedUser.createdNotes,
        email: savedUser.email,
        id: savedUser._id,
        isActivated: savedUser.isActivated,
        username: savedUser.username
      },
    };
  }
  async getUserById(id: string) {
    return this.userModel.findById(id).populate('createdNotes').exec();
  }
  async activate(activationLink) {
    const user = await this.userModel.findOne({ activationLink });

    if (!user) {
      throw new BadRequestException();
    }
    user.isActivated = true;
    await user.save();
  }
  async getMe(id) {
    const user = await this.userModel
      .findOne({ _id: new Types.ObjectId(id) })
      .populate('createdNotes');
    return {
      email : user.email,
      id : user._id,
      isActivated: user.isActivated,
      username: user.username,
      createdNotes : user.createdNotes
    };
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect, Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { createUserDto } from './dto/createUser.dto';
import { Response, Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './guards/jwt.guard';
import { UserId } from '../decorators/user-email.decorator';
import { UserService } from './user.service';
import {ObjectId, Types} from 'mongoose';

@Controller('user')
export class UserController {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {}
  @UsePipes(new ValidationPipe())
  @Post('register')
  async createUser(@Body() dto: createUserDto, @Res() response: Response) {
    const userData = await this.userService.createUser(dto);
    response.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    response.json(userData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@UserId() id: Types.ObjectId) {
    const userData = await this.userService.getMe(id)
    return userData
  }
  @Get(':id')
  async getById(@Param('id') id) {

    return this.userService.getUserById(id);
  }
  @Get('activate/:link')
  async activate(@Param('link') link, @Res() res: Response) {
    await this.userService.activate(link);
    return res.redirect(this.configService.get('CLIENT_URL'));
  }
}

import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe, Delete, Req, Res, Get
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { loginDto } from "./dto/login.dto";
import { Request, Response } from "express";
import {serialize} from "class-transformer";
import * as domain from "domain";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService
  ) {
  }

  @UsePipes(new ValidationPipe())
  @Post("login")
  async login(@Body() dto: loginDto, @Res({passthrough: true}) res : Response) {
    const userData= await this.authService.login(dto);
    res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
    res.json(userData)
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({passthrough: true}) res : Response) {
    const { refreshToken } = req.cookies;
    res.clearCookie('refreshToken')
    const token = await this.authService.logout(refreshToken);

    res.json(token)
  }
  @Get('refresh')
  async refresh(@Req() req: Request, @Res({passthrough: true}) res : Response) {
    const { refreshToken } = req.cookies;
    const userData = await this.authService.refresh(refreshToken);
    console.log(req.cookies)
    res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'none'})
    res.cookie('accessToken', userData.accessToken, {maxAge: 30 * 60, sameSite: 'none'})
    res.json(userData)
  }
}


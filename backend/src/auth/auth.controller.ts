import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Version,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  LoginPasswordRequestDto,
  LoginRequestDto,
  RegisterPasswordRequestDto,
} from './request';
import BaseResponse from 'src/commons/response/BaseResponse';
import { JwtAuthGuard } from './jwt-auth-guard';

@ApiTags('Auth Controller')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Version('1')
  @ApiBody({ type: RegisterPasswordRequestDto })
  @Post('register')
  async register(@Body() registerReq: RegisterPasswordRequestDto) {
    try {
      const accessToken = await this.authService.register(registerReq);
      return BaseResponse.createSuccessResponse(registerReq, accessToken);
    } catch (e) {
      return BaseResponse.createFailedResponse(registerReq, null, e.message);
    }
  }

  @Version('1')
  @ApiBody({ type: LoginRequestDto })
  @Post('google/login')
  async login(@Body() loginReq: LoginRequestDto) {
    try {
      const accessToken = await this.authService.login(loginReq.email);
      return BaseResponse.createSuccessResponse(loginReq, accessToken);
    } catch (e) {
      return BaseResponse.createFailedResponse(loginReq, null, e.message);
    }
  }

  @Version('1')
  @ApiBody({ type: LoginPasswordRequestDto })
  @Post('login')
  async loginPassword(@Body() loginReq: LoginPasswordRequestDto) {
    try {
      const accessToken = await this.authService.loginWithPassword(
        loginReq.email,
        loginReq.password,
      );
      return BaseResponse.createSuccessResponse(loginReq, accessToken);
    } catch (e) {
      return BaseResponse.createFailedResponse(loginReq, null, e.message);
    }
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Get('history')
  @ApiBearerAuth()
  async loginHistory(@Request() req) {
    try {
      const histories = await this.authService.getHistories(req);
      return BaseResponse.createSuccessResponse(null, histories);
    } catch (e) {
      return BaseResponse.createFailedResponse(null, null, e.message);
    }
  }
}

import {Body, Controller, Get, Post, UnauthorizedException, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import {
  BadRequest,
  DataResponse,
  ServerError,
} from '../common/responses/_global';
import {TokenSuccessResponse} from '../common/responses/auth.response';
import {LoginDto} from "./dto/login.dto";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
      @Body() dto: LoginDto,
  ): Promise<DataResponse<TokenSuccessResponse> | BadRequest | ServerError> {
    return this.authService.login(dto);
  }
  @Post('register')
  async register(
    @Body() dto: RegisterDto,
  ): Promise<DataResponse<TokenSuccessResponse> | BadRequest | ServerError> {
    return this.authService.register(dto);
  }

  @Get('verificate')
  @UseGuards(JwtAuthGuard)
  async verificate(
  ): Promise<{ isValid: boolean } | UnauthorizedException> {
    return {
      isValid: true
    }
  }
}

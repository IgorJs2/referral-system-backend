import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import {
  BadRequest,
  DataResponse,
  ServerError,
} from '../common/responses/_global';
import { RegisterSuccessResponse } from '../common/responses/auth.response';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body() dto: RegisterDto,
  ): Promise<DataResponse<RegisterSuccessResponse> | BadRequest | ServerError> {
    return this.authService.register(dto);
  }
}

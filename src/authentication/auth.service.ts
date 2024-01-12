import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { ResponseService } from '../common/services/response.service';
import { ErrorService } from '../common/services/error.service';
import { UserService } from '../lib/user/user.service';
import { ConfigService } from '@nestjs/config';
import { EUserSource } from '../db/interfaces/user.interface';
import {
  SOURCE_USERNAME_NOT_EXIST,
  USER_ALREADY_REGISTERED,
} from '../common/constant/response.constant';
import { UTCDateFromDayAmountHelper } from '../common/helpers/UTCDateFromDayAmount.helper';
import {
  BadRequest,
  DataResponse,
  ServerError,
} from '../common/responses/_global';
import { RegisterSuccessResponse } from '../common/responses/auth.response';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private responseService: ResponseService,
    private errorService: ErrorService,
    private configService: ConfigService,
  ) {}

  async register(
    registerDto: RegisterDto,
  ): Promise<DataResponse<RegisterSuccessResponse> | BadRequest | ServerError> {
    try {
      const isUserExist = await this.userService._isUserExist(
        registerDto.username,
        registerDto.email,
      );

      if (isUserExist) {
        return this.errorService.BadRequest({
          message: USER_ALREADY_REGISTERED,
        });
      }

      if (registerDto.source == EUserSource.BY_USER) {
        const isSourceUserExist = await this.userService._isUserExist(
          registerDto.source_referral || '',
        );

        if (!isSourceUserExist || !registerDto.source_referral) {
          return this.errorService.BadRequest({
            message: SOURCE_USERNAME_NOT_EXIST,
          });
        }
      }

      const userData = await this.userService._createUserForRegistration(
        registerDto,
      );

      const auth_data = {
        access_token: this.jwtService.sign({
          ...userData,
          id: userData.id.toString(),
          sub: userData.id.toString(),
        }),
        expires_in: UTCDateFromDayAmountHelper(1),
      };

      return this.responseService.DataResponse(auth_data);
    } catch (e) {
      await this.errorService.HandleError(e);
    }
  }
}

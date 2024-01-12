import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../authentication/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { DataResponse, ServerError } from '../../common/responses/_global';
import { GetUserPersonalInfoResponse } from '../../common/responses/user.response';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('person')
  @UseGuards(JwtAuthGuard)
  GetPersonalInformation(
    @Req() req,
  ): Promise<DataResponse<GetUserPersonalInfoResponse> | ServerError> {
    return this.userService.GetPersonalInformation(req.user);
  }
}

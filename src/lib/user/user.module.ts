import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HttpModule } from '@nestjs/axios';
import { ResponseService } from '../../common/services/response.service';
import { ErrorService } from '../../common/services/error.service';
import { JwtService } from '@nestjs/jwt';
import { DbModule } from '../../db/db.module';
import { ReferralService } from '../referral/referral.service';
import { ReferrerService } from '../referrer/referrer.service';

@Module({
  imports: [DbModule, HttpModule],
  providers: [
    UserService,
    ReferralService,
    ReferrerService,
    ResponseService,
    ErrorService,
    JwtService,
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}

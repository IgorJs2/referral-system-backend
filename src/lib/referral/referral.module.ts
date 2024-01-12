import { Module } from '@nestjs/common';
import { ReferralService } from './referral.service';
import { ReferralController } from './referral.controller';
import { HttpModule } from '@nestjs/axios';
import { ResponseService } from '../../common/services/response.service';
import { ErrorService } from '../../common/services/error.service';
import { JwtService } from '@nestjs/jwt';
import { DbModule } from '../../db/db.module';

@Module({
  imports: [DbModule, HttpModule],
  providers: [ReferralService, ResponseService, ErrorService, JwtService],
  controllers: [ReferralController],
  exports: [ReferralService],
})
export class ReferralModule {}

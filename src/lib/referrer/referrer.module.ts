import { Module } from '@nestjs/common';
import { ReferrerService } from './referrer.service';
import { ReferrerController } from './referrer.controller';
import { HttpModule } from '@nestjs/axios';
import { ResponseService } from '../../common/services/response.service';
import { ErrorService } from '../../common/services/error.service';
import { JwtService } from '@nestjs/jwt';
import { DbModule } from '../../db/db.module';

@Module({
  imports: [DbModule, HttpModule],
  providers: [ReferrerService, ResponseService, ErrorService, JwtService],
  controllers: [ReferrerController],
  exports: [ReferrerService],
})
export class ReferrerModule {}

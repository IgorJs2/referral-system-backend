import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './guards/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from '../lib/user/user.service';
import { HttpModule } from '@nestjs/axios';
import { ResponseService } from '../common/services/response.service';
import { ErrorService } from '../common/services/error.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { SecondsDateFromDayAmountHelper } from '../common/helpers/SecondsDateFromDayAmount.helper';
import { UserModule } from '../lib/user/user.module';
import { DbModule } from '../db/db.module';
import { ReferralModule } from '../lib/referral/referral.module';
import { ReferrerModule } from '../lib/referrer/referrer.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    forwardRef(() => UserModule),
    ReferralModule,
    ReferrerModule,
    PassportModule,
    DbModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: {
          expiresIn: SecondsDateFromDayAmountHelper(1),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    JwtAuthGuard,
    JwtStrategy,
    UserService,
    ResponseService,
    ErrorService,
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Referrer } from './entities/referrer.entity';
import { Referral } from './entities/referral.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Referrer, Referral])],
  exports: [TypeOrmModule.forFeature([User, Referrer, Referral])],
})
export class DbModule {}

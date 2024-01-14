import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResponseService } from '../../common/services/response.service';
import { ErrorService } from '../../common/services/error.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Referral } from '../../db/entities/referral.entity';

@Injectable()
export class ReferralService {
  constructor(
    private responseService: ResponseService,
    private errorService: ErrorService,
    @InjectRepository(Referral)
    private referralRepository: Repository<Referral>,
    private configService: ConfigService,
  ) {}

  //**************************************
  //*************HELPERS******************
  //**************************************

  public async _addRefereeToUser(referral_id: number, referee_id: number) {
    await this.referralRepository.save({
      referral_id,
      referee_id,
    });
  }

  public async _getUserRefereeUsernames(referral_id: number) {
    const referees = await this.referralRepository.find({
      where: {
        referral_id,
      },
      relations: ['referrer', 'referee'],
    });

    return referees.map((e) => e.referee.username);
  }
}

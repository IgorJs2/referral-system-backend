import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Referrer } from '../../db/entities/referrer.entity';
import { POINT_AMOUNT_FOR_ONE_USER } from '../../common/constant/global.constant';

@Injectable()
export class ReferrerService {
  constructor(
    @InjectRepository(Referrer)
    private referrerRepository: Repository<Referrer>,
  ) {}

  //**************************************
  //*************HELPERS******************
  //**************************************

  public async _addPointToUser(user_id: number) {
    const referrer = await this.referrerRepository.findOne({
      where: {
        user_id,
      },
    });

    if (!referrer) {
      await this.referrerRepository.save({
        user_id,
        points: POINT_AMOUNT_FOR_ONE_USER,
      });

      return;
    }

    referrer.points += 10;
    await this.referrerRepository.save(referrer);
  }

  public async _getUserPoints(user_id: number) {
    const referrer = await this.referrerRepository.findOne({
      where: {
        user_id,
      } as FindOptionsWhere<Referrer> | FindOptionsWhere<Referrer>[],
    });

    return referrer?.points || 0;
  }
}

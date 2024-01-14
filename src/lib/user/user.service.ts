import { Injectable } from '@nestjs/common';
import { User } from '../../db/entities/user.entity';
import * as bcrypt from 'bcrypt';
import {
  IPublicUser,
  IUserReferralData,
} from '../../common/interfaces/user.interface';
import { plainToClass } from 'class-transformer';
import { ResponseService } from '../../common/services/response.service';
import { ErrorService } from '../../common/services/error.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from '../../authentication/dto/register.dto';
import { EUserSource } from '../../db/interfaces/user.interface';
import { ReferralService } from '../referral/referral.service';
import { ReferrerService } from '../referrer/referrer.service';
import { PersonalUserEntity } from '../../common/entities/user.entity';
import {BadRequest, DataResponse, ServerError} from '../../common/responses/_global';
import { GetUserPersonalInfoResponse } from '../../common/responses/user.response';
import {LoginDto} from "../../authentication/dto/login.dto";

@Injectable()
export class UserService {
  constructor(
    private responseService: ResponseService,
    private errorService: ErrorService,
    private referralService: ReferralService,
    private referrerService: ReferrerService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async GetPersonalInformation(
    public_user: IPublicUser,
  ): Promise<DataResponse<GetUserPersonalInfoResponse> | ServerError> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          username: public_user.username,
        },
      });

      const personal_user: PersonalUserEntity = plainToClass(
        PersonalUserEntity,
        user,
      );
      const referral_data: IUserReferralData = await this._getUserReferralData(
        user.id,
      );

      return this.responseService.DataResponse({
        ...personal_user,
        ...referral_data,
      }) as unknown as DataResponse<GetUserPersonalInfoResponse>;
    } catch (e) {
      await this.errorService.HandleError(e);
    }
  }

  //**************************************
  //*************HELPERS******************
  //**************************************

  public async _checkUserCredentials(dto: LoginDto): Promise<User | string> {
    const user = await this.userRepository.findOne({
      where: {
        username: dto.username,
      },
    });

    if (!user) {
      return "User not found."
    }

    const isPasswordCorrect = await bcrypt.compare(
        dto.password,
        user.Password,
    );

    if (!isPasswordCorrect) {
      return "Password incorrect."
    }

    return user;
  }

  public async _createUserForRegistration(dto: RegisterDto): Promise<User> {
    const password = await bcrypt.hash(dto.password, 4);

    const user = await this.userRepository.save({
      username: dto.username,
      Email: dto.email,
      Password: password,
      dateOfBirth: dto.dateOfBirth,
      source: dto.source,
    });

    if (dto.source == EUserSource.BY_USER) {
      const referral_user = await this.userRepository.findOne({
        where: {
          username: dto.source_referral,
        },
      });
      await this.referralService._addRefereeToUser(referral_user.id, user.id);
      await this.referrerService._addPointToUser(referral_user.id);
    }

    return user;
  }

  public async _isUserExist(username?: string, email?: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: [{ username: username }, { Email: email }],
    });

    return !!user;
  }

  private async _getUserReferralData(user_id: number): Promise<IUserReferralData> {
    const points = await this.referrerService._getUserPoints(user_id);
    const referee_usernames =
      await this.referralService._getUserRefereeUsernames(user_id);

    return {
      points,
      referee_usernames,
    };
  }
}

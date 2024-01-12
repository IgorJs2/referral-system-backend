import { Controller } from '@nestjs/common';
import { ReferralService } from './referral.service';

@Controller('api/referral')
export class ReferralController {
  constructor(private referralService: ReferralService) {}
}

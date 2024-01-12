import { Controller } from '@nestjs/common';
import { ReferrerService } from './referrer.service';

@Controller('api/referrer')
export class ReferrerController {
  constructor(private referrerService: ReferrerService) {}
}

import { Test, TestingModule } from '@nestjs/testing';
import { ReferralController } from './referral.controller';

describe('ReferralController', () => {
  let controller: ReferralController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ReferralController],
      providers: [],
    }).compile();

    controller = module.get<ReferralController>(ReferralController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

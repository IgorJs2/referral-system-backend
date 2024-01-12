import { Test, TestingModule } from '@nestjs/testing';
import { ReferrerController } from './referrer.controller';

describe('ReferrerController', () => {
  let controller: ReferrerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ReferrerController],
      providers: [],
    }).compile();

    controller = module.get<ReferrerController>(ReferrerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

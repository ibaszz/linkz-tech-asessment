import { Test, TestingModule } from '@nestjs/testing';
import { LoginHistoryService } from './loginhistory.service';

describe('LoginHistoryService', () => {
  let service: LoginHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginHistoryService],
    }).compile();

    service = module.get<LoginHistoryService>(LoginHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

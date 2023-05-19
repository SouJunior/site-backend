import { Test, TestingModule } from '@nestjs/testing';
import { CollaboratorsService } from './collaborators.service';

describe('CollaboratorsService', () => {
  let service: CollaboratorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollaboratorsService],
    }).compile();

    service = module.get<CollaboratorsService>(CollaboratorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

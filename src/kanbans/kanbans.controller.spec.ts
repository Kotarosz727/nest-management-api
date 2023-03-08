import { Test, TestingModule } from '@nestjs/testing';
import { KanbansController } from './kanbans.controller';
import { KanbansService } from './kanbans.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Kanban } from './entities/kanban.entity';

describe('KanbansController', () => {
  let controller: KanbansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KanbansController,
        KanbansService,
        {
          useClass: Repository,
          provide: getRepositoryToken(Kanban),
        },
      ],
    }).compile();

    controller = module.get<KanbansController>(KanbansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

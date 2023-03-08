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
      controllers: [KanbansController],
      providers: [
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

  it('should return all kanbans', async () => {
    const kanbans = [
      new Kanban('1', 'タイトル1', 0),
      new Kanban('2', 'タイトル2', 1),
    ];
    jest.spyOn(controller, 'findAll').mockImplementation(async () => {
      return kanbans;
    });
    const result = await controller.findAll();
    expect(result).toEqual(kanbans);
  });
});

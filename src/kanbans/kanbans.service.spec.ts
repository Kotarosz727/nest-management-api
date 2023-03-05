import { Test, TestingModule } from '@nestjs/testing';
import { KanbansService } from './kanbans.service';
import { Repository } from 'typeorm';
import { Kanban } from './entities/kanban.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

const user = new User('太郎', 20, '09012345678');
const kanbans = [
  new Kanban('1', 'タイトル1', 0, user),
  new Kanban('2', 'タイトル2', 1, user),
];

describe('KanbansService', () => {
  let service: KanbansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KanbansService,
        {
          useClass: Repository,
          provide: getRepositoryToken(Kanban),
        },
      ],
    }).compile();

    service = module.get<KanbansService>(KanbansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return all kanbans', async () => {
    jest.spyOn(service, 'findAll').mockImplementation(async () => {
      return kanbans;
    });
    expect(await service.findAll()).toEqual(kanbans);
  });
});

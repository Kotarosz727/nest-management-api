import { Test, TestingModule } from '@nestjs/testing';
import { KanbansService } from './kanbans.service';
import { Repository } from 'typeorm';
import { Kanban } from './entities/kanban.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { CreateKanbanDto } from './dto/create-kanban.dto';

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
    const result = await service.findAll();
    expect(result).toEqual(kanbans);
  });

  it('should return a kanban', async () => {
    jest.spyOn(service, 'findOne').mockImplementation(async (id: string) => {
      return {
        id: id,
        ...kanbans[0],
      };
    });
    const result = await service.findOne('find_one_test');
    expect(result).toEqual({ id: 'find_one_test', ...kanbans[0] });
  });

  it('should create kanban', async () => {
    jest
      .spyOn(service, 'create')
      .mockImplementation(async (kanban: CreateKanbanDto) => {
        return {
          id: 'create_test',
          ...kanban,
        } as Kanban;
      });
    const dto: CreateKanbanDto = {
      name: 'タイトル',
      description: '説明',
      status: 0,
      user: user,
    };
    const kanban = await service.create(dto);
    expect(kanban).toEqual({ id: 'create_test', ...dto });
  });
});

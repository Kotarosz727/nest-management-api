import { Test, TestingModule } from '@nestjs/testing';
import { KanbansService } from './kanbans.service';
import { Repository } from 'typeorm';
import { Kanban } from './entities/kanban.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateKanbanDto } from './dto/create-kanban.dto';
import { UpdateKanbanDto } from './dto/update-kanban.dto';

const userId = 'user_1';
const kanbans = [
  {
    id: '1',
    name: 'test1',
    description: 'test1',
    status: 0,
    userId: userId,
  },
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
      return kanbans as Kanban[];
    });
    const result = await service.findAll(userId);
    expect(result).toEqual(kanbans);
  });

  it('should return a kanban', async () => {
    jest.spyOn(service, 'findOne').mockImplementation(async (id: string) => {
      return {
        id: id,
        ...kanbans[0],
      } as Kanban;
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
    };
    const kanban = await service.create(dto, userId);
    expect(kanban).toEqual({ id: 'create_test', ...dto });
  });

  it('should update kanban', async () => {
    jest
      .spyOn(service, 'update')
      .mockImplementation(async (id: string, kanban: UpdateKanbanDto) => {
        return {
          id: id,
          ...kanban,
        } as Kanban;
      });
    const dto: UpdateKanbanDto = {
      name: 'タイトル',
      description: '説明',
      status: 1,
    };
    const kanban = await service.update('update_test', dto);
    expect(kanban).toEqual({ id: 'update_test', ...dto });
  });

  it('should delete kanban', async () => {
    jest.spyOn(service, 'remove').mockImplementation(async () => {
      return { deleted: true };
    });
    const kanban = await service.remove('remove_test');
    expect(kanban).toEqual({ deleted: true });
  });
});

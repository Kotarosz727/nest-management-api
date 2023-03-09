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

  it('should return a kanban', async () => {
    const kanban = new Kanban('1', 'タイトル1', 0);
    jest.spyOn(controller, 'findOne').mockImplementation(async (id: string) => {
      return {
        id: id,
        ...kanban,
      };
    });
    const result = await controller.findOne('find_one_test');
    expect(result).toEqual({ id: 'find_one_test', ...kanban });
  });

  it('should create kanban', async () => {
    const kanban = new Kanban('1', 'タイトル1', 0);
    jest
      .spyOn(controller, 'create')
      .mockImplementation(async (kanban: Kanban) => {
        return {
          id: 'create_test',
          ...kanban,
        };
      });
    const result = await controller.create(kanban);
    expect(result).toEqual({ id: 'create_test', ...kanban });
  });

  it('should update kanban', async () => {
    const kanban = new Kanban('1', 'タイトル1', 0);
    jest
      .spyOn(controller, 'update')
      .mockImplementation(async (id: string, kanban: Kanban) => {
        return {
          id: id,
          ...kanban,
        };
      });
    const result = await controller.update('update_test', kanban);
    expect(result).toEqual({ id: 'update_test', ...kanban });
  });

  it('should delete kanban', async () => {
    const deleted = {
      deleted: true,
      message: '削除しました',
    };
    jest.spyOn(controller, 'remove').mockImplementation(async () => {
      return {
        deleted: true,
        message: '削除しました',
      };
    });
    const result = await controller.remove('remove_test');
    expect(result).toEqual(deleted);
  });
});

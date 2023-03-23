import { Test, TestingModule } from '@nestjs/testing';
import { KanbansController } from './kanbans.controller';
import { KanbansService } from './kanbans.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Kanban } from './entities/kanban.entity';
import { CreateKanbanDto } from './dto/create-kanban.dto';

describe('KanbansController', () => {
  const userID = '1';
  const kanban = {
    id: '1',
    name: 'タイトル1',
    description: '説明1',
    status: 0,
    userId: userID,
  };
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
    const kanbans = [kanban];
    jest.spyOn(controller, 'findAll').mockImplementation(async () => {
      return kanbans as Kanban[];
    });
    const result = await controller.findAll(userID);
    expect(result).toEqual(kanbans);
  });

  it('should return a kanban', async () => {
    jest.spyOn(controller, 'findOne').mockImplementation(async (id: string) => {
      return {
        id: id,
        ...kanban,
      } as Kanban;
    });
    const result = await controller.findOne('find_one_test');
    expect(result).toEqual({ id: 'find_one_test', ...kanban });
  });

  it('should create kanban', async () => {
    jest.spyOn(controller, 'create').mockImplementation(async () => {
      return {
        id: 'create_test',
        ...kanban,
      } as Kanban;
    });
    const result = await controller.create(userID, kanban as CreateKanbanDto);
    expect(result).toEqual({ id: 'create_test', ...kanban });
  });

  it('should update kanban', async () => {
    jest
      .spyOn(controller, 'update')
      .mockImplementation(async (id: string, kanban: Kanban) => {
        return {
          id: id,
          ...kanban,
        };
      });
    const result = await controller.update('update_test', kanban as Kanban);
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

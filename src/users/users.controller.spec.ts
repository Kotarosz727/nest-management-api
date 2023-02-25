import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('user should be created', () => {
    const dto: CreateUserDto = {
      name: 'test',
      age: 20,
      email: 'test@example.com',
      phoneNumber: '1234567890',
    };

    jest
      .spyOn(service, 'create')
      .mockImplementation(async (dto: CreateUserDto) => {
        const user: User = {
          id: '1',
          ...dto,
        };
        return user;
      });

    expect(controller.create(dto)).resolves.toEqual({
      id: '1',
      ...dto,
    });
  });

  it('should return all users', () => {
    const dto: CreateUserDto = {
      name: '太郎',
      age: 20,
      email: 'test@example.com',
      phoneNumber: '09012345678',
    };

    jest.spyOn(service, 'findAll').mockImplementation(async () => {
      const user: User = {
        id: '1',
        ...dto,
      };
      return [user];
    });

    expect(controller.findAll()).resolves.toEqual([
      {
        id: '1',
        ...dto,
      },
    ]);
  });

  it('should return a user', () => {
    const dto: CreateUserDto = {
      name: '太郎',
      age: 20,
      email: 'test@example.com',
      phoneNumber: '09012345678',
    };

    jest.spyOn(service, 'findOne').mockImplementation(async () => {
      const user: User = {
        id: '1',
        ...dto,
      };
      return user;
    });

    expect(controller.findOne('1')).resolves.toEqual({
      id: '1',
      ...dto,
    });
  });

  it('should return 404 not found', () => {
    jest
      .spyOn(service, 'findOne')
      .mockRejectedValue({ status: 404, message: 'Not Found' });

    expect(controller.findOne('1')).rejects.toEqual({
      status: 404,
      message: 'Not Found',
    });
  });
});

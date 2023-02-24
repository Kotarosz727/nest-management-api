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
});

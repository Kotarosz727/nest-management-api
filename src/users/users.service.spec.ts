import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
  let service: UsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          useClass: Repository,
          provide: getRepositoryToken(User),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('create()', () => {
    it('should successfully insert a user', () => {
      const dto: CreateUserDto = {
        name: '太郎',
        age: 20,
        email: 'test@example.com',
        phoneNumber: '09012345678',
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

      expect(service.create(dto)).resolves.toEqual({
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

      expect(service.findAll()).resolves.toEqual([
        {
          id: '1',
          ...dto,
        },
      ]);
    });
  });
});

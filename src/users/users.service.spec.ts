import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '../auth/auth.service';

describe('UsersService', () => {
  let service: UsersService;
  const password = 'password';
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        AuthService,
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
        phoneNumber: '09012345678',
        password,
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
        phoneNumber: '09012345678',
        password,
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

    it('should return a user', () => {
      const dto: CreateUserDto = {
        name: '太郎',
        age: 20,
        phoneNumber: '09012345678',
        password,
      };

      jest.spyOn(service, 'findOne').mockImplementation(async () => {
        const user: User = {
          id: '1',
          ...dto,
        };
        return user;
      });

      expect(service.findOne('1')).resolves.toEqual({
        id: '1',
        ...dto,
      });
    });

    it('should return 404 not found', () => {
      jest.spyOn(service, 'findOne').mockRejectedValue({
        statusCode: 404,
        message: 'Not Found',
      });

      expect(service.findOne('1')).rejects.toEqual({
        statusCode: 404,
        message: 'Not Found',
      });
    });

    it('should update user', async () => {
      const dto: UpdateUserDto = {
        name: '太郎',
        age: 20,
        phoneNumber: '09012345678',
      };
      const id = '1';

      jest
        .spyOn(service, 'update')
        .mockReturnValue(Promise.resolve({ id, ...dto }));

      await expect(service.update(id, dto)).resolves.toEqual({
        id,
        ...dto,
      });
    });

    it('should delete user', async () => {
      const id = '1';
      const dto: CreateUserDto = {
        name: '太郎',
        age: 20,
        phoneNumber: '09012345678',
        password,
      };

      jest
        .spyOn(service, 'remove')
        .mockReturnValue(Promise.resolve({ id, ...dto }));

      await expect(service.remove(id)).resolves.toEqual({ id, ...dto });
    });
  });
});

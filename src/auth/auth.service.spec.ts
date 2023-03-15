import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { AuthProvider } from './providers/auth.provider';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let authService: AuthService;
  let authProvider: AuthProvider;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        JwtService,
        {
          useClass: Repository,
          provide: getRepositoryToken(User),
        },
        AuthProvider,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authProvider = module.get<AuthProvider>(AuthProvider);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('returns user when given correct name and password', async () => {
    const mockUser: Pick<User, 'id' | 'name' | 'password'> = {
      id: '1',
      name: 'testuser',
      password: '$2b$10$wH4OJ4v4D4/4Xs9sEJnuzukKkkC1W8M1LdCQ2h2v/iKjSYW8a9X9C',
    };

    jest
      .spyOn(authProvider, 'comparePassword')
      .mockImplementation(async (password: string, hashedPassword: string) =>
        Promise.resolve(
          password === 'testpassword' && hashedPassword === mockUser.password,
        ),
      );

    jest
      .spyOn(usersService, 'findByNameWithPassword')
      .mockImplementation(async (name: string) => {
        return name === mockUser.name ? mockUser : null;
      });

    const user = await authService.validateUser(mockUser.name, 'testpassword');

    expect(user).toEqual(mockUser);
    expect(usersService.findByNameWithPassword).toHaveBeenCalledWith(
      mockUser.name,
    );
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { AuthProvider } from './auth/providers/auth.provider';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { CreateUserDto } from './users/dto/create-user.dto';

describe('AppController', () => {
  let appController: AppController;
  let authService: AuthService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        AuthService,
        UsersService,
        { useClass: Repository, provide: getRepositoryToken(User) },
        AuthProvider,
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    authService = app.get<AuthService>(AuthService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  it('should return a success message when authService.signIn succeeds', async () => {
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      age: 30,
      phoneNumber: '1234567890',
      password: 'mysecretpassword',
    };

    jest.spyOn(authService, 'registration').mockImplementation(async () => {
      const user: User = {
        id: '1',
        name: 'John Doe',
        age: 30,
        phoneNumber: '1234567890',
        password: 'mysecretpassword',
      };
      return user;
    });

    const result = await appController.signIn(createUserDto);

    expect(result).toEqual({ message: 'success signIn' });
  });
});

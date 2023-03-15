import { Test, TestingModule } from '@nestjs/testing';
import { AuthProvider } from './auth.provider';

describe('AuthProvider', () => {
  let authProvider: AuthProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthProvider],
    }).compile();

    authProvider = module.get<AuthProvider>(AuthProvider);
  });

  it('should be defined', () => {
    expect(authProvider).toBeDefined();
  });

  describe('hashPassword', () => {
    it('should hash the password', async () => {
      const password = await authProvider.hashPassword('testpassword');
      expect(password).not.toEqual('testpassword');
    });
  });

  describe('comparePassword', () => {
    it('should return true when the password is correct', async () => {
      const password = await authProvider.hashPassword('testpassword');
      const result = await authProvider.comparePassword(
        'testpassword',
        password,
      );
      expect(result).toBeTruthy();
    });

    it('should return false when the password is incorrect', async () => {
      const password = await authProvider.hashPassword('testpassword');
      const result = await authProvider.comparePassword(
        'incorrectpassword',
        password,
      );
      expect(result).toBeFalsy();
    });
  });
});

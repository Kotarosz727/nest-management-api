import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthProvider } from './providers/auth.provider';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly authProvider: AuthProvider,
  ) {}

  async registration(users: CreateUserDto) {
    const password = await this.authProvider.hashPassword(users.password);
    return await this.usersService.create({ ...users, password });
  }
}

import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
    return await this.usersService
      .create({ ...users, password })
      .catch((err) => {
        throw new InternalServerErrorException(`user create error. ${err}`);
      });
  }

  async validateUser(name: string, password: string): Promise<any> {
    const user = await this.usersService.findByNameWithPassword(name);

    if (
      user &&
      (await this.authProvider.comparePassword(password, user.password))
    ) {
      return user;
    }
    return null;
  }
}

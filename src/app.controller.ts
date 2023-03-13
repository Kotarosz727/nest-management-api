import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './users/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('auth/signIn')
  async signIn(@Body() createUserDto: CreateUserDto) {
    try {
      await this.authService.registration(createUserDto);
      return { message: 'success signIn' };
    } catch (error) {
      console.log(error);
    }
  }
}

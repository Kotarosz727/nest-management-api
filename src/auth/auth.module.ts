import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthProvider } from './providers/auth.provider';

@Module({
  providers: [AuthService, AuthProvider],
  exports: [AuthService],
  imports: [UsersModule],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthProvider } from './providers/auth.provider';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
  providers: [AuthService, AuthProvider, LocalStrategy],
  exports: [AuthService],
  imports: [UsersModule, PassportModule],
})
export class AuthModule {}

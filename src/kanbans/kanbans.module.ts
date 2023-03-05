import { Module } from '@nestjs/common';
import { KanbansService } from './kanbans.service';
import { KanbansController } from './kanbans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kanban } from './entities/kanban.entity';

@Module({
  controllers: [KanbansController],
  providers: [KanbansService],
  imports: [TypeOrmModule.forFeature([Kanban])],
})
export class KanbansModule {}

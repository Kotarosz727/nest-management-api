import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { KanbansService } from './kanbans.service';
import { CreateKanbanDto } from './dto/create-kanban.dto';
import { UpdateKanbanDto } from './dto/update-kanban.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('kanbans')
export class KanbansController {
  constructor(private readonly kanbansService: KanbansService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createKanbanDto: CreateKanbanDto) {
    const { userId } = req.user;
    return this.kanbansService.create(createKanbanDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    const { userId } = req.user;
    return this.kanbansService.findAll(userId);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kanbansService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKanbanDto: UpdateKanbanDto) {
    return this.kanbansService.update(id, updateKanbanDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kanbansService.remove(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { KanbansService } from './kanbans.service';
import { CreateKanbanDto } from './dto/create-kanban.dto';
import { UpdateKanbanDto } from './dto/update-kanban.dto';

@Controller('kanbans')
export class KanbansController {
  constructor(private readonly kanbansService: KanbansService) {}

  @Post()
  create(@Body() createKanbanDto: CreateKanbanDto) {
    return this.kanbansService.create(createKanbanDto);
  }

  @Get()
  findAll() {
    return this.kanbansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kanbansService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKanbanDto: UpdateKanbanDto) {
    return this.kanbansService.update(+id, updateKanbanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kanbansService.remove(+id);
  }
}

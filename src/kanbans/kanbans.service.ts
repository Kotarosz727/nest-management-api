import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateKanbanDto } from './dto/create-kanban.dto';
import { UpdateKanbanDto } from './dto/update-kanban.dto';
import { Kanban } from './entities/kanban.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class KanbansService {
  constructor(
    @InjectRepository(Kanban)
    private readonly kanbansRepository: Repository<Kanban>,
  ) {}

  async create(createKanbanDto: CreateKanbanDto): Promise<Kanban> {
    return await this.kanbansRepository.save(createKanbanDto).catch((err) => {
      throw new InternalServerErrorException(`kanban create error. ${err}`);
    });
  }

  async findAll(): Promise<Kanban[]> {
    return await this.kanbansRepository.find().catch((err) => {
      throw new InternalServerErrorException(`kanbans find error. ${err}`);
    });
  }

  async findOne(id: string): Promise<Kanban> {
    return this.kanbansRepository
      .findOne({ where: { id: id } })
      .catch((err) => {
        throw new InternalServerErrorException(`kanban find error. ${err}`);
      });
  }

  async update(id: string, updateKanbanDto: UpdateKanbanDto): Promise<Kanban> {
    const kanban = await this.findOne(id);
    if (!kanban) throw new NotFoundException(`kanban not found. id: ${id}`);
    this.kanbansRepository.merge(kanban, updateKanbanDto);
    return this.kanbansRepository.save(kanban).catch((err) => {
      throw new InternalServerErrorException(`kanban update error. ${err}`);
    });
  }

  remove(id: number) {
    return `This action removes a #${id} kanban`;
  }
}

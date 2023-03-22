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
import { User } from '../users/entities/user.entity';

@Injectable()
export class KanbansService {
  constructor(
    @InjectRepository(Kanban)
    private readonly kanbansRepository: Repository<Kanban>,
  ) {}

  async create(
    createKanbanDto: CreateKanbanDto,
    userId: string,
  ): Promise<Kanban> {
    createKanbanDto.userId = userId;
    console.log(createKanbanDto);
    return await this.kanbansRepository.save(createKanbanDto).catch((err) => {
      throw new InternalServerErrorException(`kanban create error. ${err}`);
    });
  }

  async findAll(userId: string): Promise<Kanban[]> {
    return await this.kanbansRepository
      .find({
        where: {
          userId: userId,
        },
      })
      .catch((err) => {
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

  async remove(id: string): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.kanbansRepository.delete(id);
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}

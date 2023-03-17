import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(createUserDto).catch((err) => {
      throw new InternalServerErrorException(`user create error. ${err}`);
    });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find().catch((err) => {
      throw new InternalServerErrorException(`user find error. ${err}`);
    });
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository
      .findOne({ where: { id: id } })
      .catch((err) => {
        throw new InternalServerErrorException(`user find error. ${err}`);
      });
  }

  async findOneByName(name: string): Promise<User> {
    return await this.userRepository
      .findOne({ where: { name: name } })
      .catch((err) => {
        throw new InternalServerErrorException(`user find error. ${err}`);
      });
  }

  async findByNameWithPassword(
    name: string,
  ): Promise<Pick<User, 'id' | 'name' | 'password'>> {
    return await this.userRepository
      .findOne({ where: { name: name }, select: ['id', 'name', 'password'] })
      .catch((err) => {
        throw new InternalServerErrorException(`user find error. ${err}`);
      });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Partial<User>> {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException(`user not found. id: ${id}`);
    this.userRepository.merge(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException(`user not found. id: ${id}`);
    return await this.userRepository.remove(user);
  }
}

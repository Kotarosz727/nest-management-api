import { KanbanStatusKey } from '../type/kanbans_type';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { User } from '../../users/entities/user.entity';

export class CreateKanbanDto {
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
  @IsNotEmpty()
  @MaxLength(255)
  description: string;
  status: KanbanStatusKey;
  user?: User;
}

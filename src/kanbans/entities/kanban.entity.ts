import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { IKanban, KanbanStatusKey } from '../type/kanbans_type';

@Entity('kanbans')
export class Kanban implements IKanban {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 255 })
  name: string;
  @Column({ type: 'varchar', length: 255 })
  description: string;
  @Column({ type: 'tinyint', default: 0 })
  status: KanbanStatusKey;
  @ManyToOne(() => User, (user) => user.kanbans, { nullable: true })
  user: User;

  constructor(
    name: string,
    description: string,
    status: KanbanStatusKey,
    user?: User,
  ) {
    this.name = name;
    this.description = description;
    this.status = status;
    this.user = user;
  }
}

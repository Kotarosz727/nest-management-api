import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

type KanbanStatus = {
  0: 'todo';
  1: 'doing';
  2: 'done';
};

type KanbanStatusKey = keyof KanbanStatus;

interface IKanban {
  id: string;
  name: string;
  description: string;
  status: KanbanStatusKey;
  user: Pick<User, 'id'> | null;
}

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
  @JoinColumn({ name: 'user_id' })
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

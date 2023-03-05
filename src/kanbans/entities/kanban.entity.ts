import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
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
  @Column('tinyint')
  status: KanbanStatusKey;
  @ManyToOne(() => User, (user) => user.kanbans, { nullable: true })
  user: User;
}

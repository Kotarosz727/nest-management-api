import { User } from '../../users/entities/user.entity';

type KanbanStatus = {
  0: 'todo';
  1: 'doing';
  2: 'done';
};

export type KanbanStatusKey = keyof KanbanStatus;

export interface IKanban {
  id: string;
  name: string;
  description: string;
  status: KanbanStatusKey;
  user: User | null;
}

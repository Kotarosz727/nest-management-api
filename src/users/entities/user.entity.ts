import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Kanban } from '../../kanbans/entities/kanban.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar', length: 255 })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 255, select: false })
  password: string;

  @OneToMany(() => Kanban, (kanban) => kanban.user)
  kanbans?: Kanban[];
}

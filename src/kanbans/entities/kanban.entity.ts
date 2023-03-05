import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('kanbans')
export class Kanban {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 255 })
  name: string;
  @Column({ type: 'varchar', length: 255 })
  description: string;
  @Column('tinyint')
  status: number;
  @ManyToOne(() => User, (user) => user.kanbans, { nullable: true })
  user: User;
}

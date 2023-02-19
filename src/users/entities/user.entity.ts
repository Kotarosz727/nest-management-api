import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar', length: 255 })
  phoneNumber: string;

  constructor(name: string, age: number, phoneNumber: string) {
    this.name = name;
    this.age = age;
    this.phoneNumber = phoneNumber;
  }
}

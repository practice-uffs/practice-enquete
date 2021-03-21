import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { AnswerEntity } from './answer.entity';
import { BaseEntity } from './base.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  idUFFS!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  name!: string;
}

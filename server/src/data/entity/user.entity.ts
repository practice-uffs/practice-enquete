import { Entity, Column } from 'typeorm';
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

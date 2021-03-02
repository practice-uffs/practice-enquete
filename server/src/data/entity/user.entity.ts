import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  birthDate!: Date;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  creationDate!: Date;

  @UpdateDateColumn()
  updateDate!: Date;
}

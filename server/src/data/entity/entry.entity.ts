import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { AnswerEntity } from './answer.entity';
import { SurveyEntity } from './survey.entity';

@Entity('entry')
export class EntryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  @Index()
  userId?: number;

  @ManyToOne(() => SurveyEntity, (survey) => survey.entries)
  survey!: SurveyEntity;

  @OneToMany(() => AnswerEntity, (answer) => answer.entry)
  answers!: AnswerEntity[];

  @CreateDateColumn()
  creationDate!: Date;

  @UpdateDateColumn()
  updateDate!: Date;
}

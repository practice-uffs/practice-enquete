import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { EntryEntity } from './entry.entity';
import { QuestionEntity } from './question.entity';

export enum SurveyStatus {
  draft = 'draft',
  public = 'public',
  closed = 'closed',
  removed = 'removed',
}

@Entity('survey')
export class SurveyEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Index()
  userId!: number;

  @Column({
    type: 'enum',
    enum: SurveyStatus,
    default: SurveyStatus.draft,
  })
  status!: SurveyStatus;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => QuestionEntity, (question) => question.survey)
  questions!: QuestionEntity[];

  @OneToMany(() => EntryEntity, (entry) => entry.survey)
  entries!: EntryEntity[];

  @CreateDateColumn()
  creationDate!: Date;

  @UpdateDateColumn()
  updateDate!: Date;
}

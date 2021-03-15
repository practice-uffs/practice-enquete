import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { EntryEntity } from './entry.entity';
import { QuestionEntity } from './question.entity';

@Entity('answer')
export class AnswerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => QuestionEntity)
  question!: QuestionEntity;

  @ManyToOne(() => EntryEntity, (entry) => entry.answers)
  entry!: EntryEntity;

  @Column({ type: 'text', nullable: true })
  value?: string;
}

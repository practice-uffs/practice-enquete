import { QuestionTypeModel, SurveyStatus } from '@domain/model';
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity('survey')
export class SurveyEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  user!: UserEntity;

  @Column({
    type: 'enum',
    enum: SurveyStatus,
    default: SurveyStatus.draft,
  })
  status!: SurveyStatus;

  @Column()
  title!: string;

  @Column({ unique: true })
  code!: string;

  @Column({ type: 'jsonb' })
  questions!: Array<QuestionTypeModel>;
}

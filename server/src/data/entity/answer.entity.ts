import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { SurveyEntity } from './survey.entity';
import { UserEntity } from './user.entity';

@Entity('answer')
export class AnswerEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, { nullable: true })
  user?: UserEntity;

  @ManyToOne(() => SurveyEntity)
  survey!: SurveyEntity;

  @Column({ type: 'json' })
  content!: object[];
}

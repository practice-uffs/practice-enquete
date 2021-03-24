import { Entity, Column, ManyToOne, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

export enum SurveyStatus {
  draft = 'draft',
  published = 'published',
  closed = 'closed',
}

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

  @Column({ type: 'json' })
  questions!: string;

  @Column({ nullable: true })
  @Index({ unique: true })
  code?: string;
}

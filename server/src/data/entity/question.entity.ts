import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { AnswerEntity } from './answer.entity';
import { SurveyEntity } from './survey.entity';

export enum QuestionTypes {
  shortText = 'short_text',
  longText = 'long_text',
  multipleChoice = 'multiple_choice',
  oneChoice = 'one_choice',
  linearScale = 'linear_scale',
  date = 'date',
  time = 'time',
  datetime = 'datetime',
}

@Entity('question')
export class QuestionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => SurveyEntity, (survey) => survey.questions)
  survey!: SurveyEntity;

  @Column({
    type: 'enum',
    enum: QuestionTypes,
    default: QuestionTypes.shortText,
  })
  type!: QuestionTypes;

  @Column()
  title!: string;

  @Column({ default: true })
  required!: boolean;

  @Column({ type: 'json', nullable: true })
  options?: string;

  @OneToMany(() => AnswerEntity, (answer) => answer.question)
  answers!: AnswerEntity[];
}

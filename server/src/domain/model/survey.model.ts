import { QuestionTypeModel } from './question.model';
import { UserTypeModel } from './user.model';

export enum SurveyStatus {
  draft = 'draft',
  published = 'published',
  closed = 'closed',
}

export interface CreateSurveyInputModel {
  userId: number;
  title: string;
  questions: Array<QuestionTypeModel>;
}

export interface SurveyIdInputModel {
  surveyId: number;
}

export interface SurveyTypeModel {
  id: number;
  status: string;
  user: UserTypeModel;
  title: string;
  code: string;
  questions: Array<QuestionTypeModel>;
}

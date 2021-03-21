import { UserTypeModel } from './user.model';

export interface SurveyInputModel {
  userId: number;
  title: string;
  questions: string;
}

export interface SurveyTypeModel {
  id: number;
  status: string;
  user: UserTypeModel;
  title: string;
  questions: string;
  code?: string;
}

import { UserTypeModel } from './user.model';

export interface CreateSurveyInputModel {
  userId: number;
  title: string;
  questions: string;
}

export interface SurveyIdInputModel {
  surveyId: number;
}

export interface SurveyTypeModel {
  id: number;
  status: string;
  user: UserTypeModel;
  title: string;
  questions: string;
  code: string;
}

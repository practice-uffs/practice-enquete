import {
  CreateSurveyInputModel,
  GetSurveysByUserInputModel,
  PublishSurveyInputModel,
  SurveyTypeModel,
} from '@domain/model/survey.model';
import { SurveyEntity, SurveyStatus } from '@data/entity/survey.entity';
import { BaseError } from '@api/error/base-error';
import { UserEntity } from '@data/entity/user.entity';
import { SuccessLocale, ErrorLocale } from '@locale';

export class SurveyDomain {
  static async create(input: CreateSurveyInputModel): Promise<SurveyTypeModel> {
    const user = await UserEntity.findOne({ id: input.userId, active: true });

    if (!user) {
      throw new BaseError(400, ErrorLocale.userNotFound);
    }

    const survey = SurveyEntity.create(input);
    survey.user = user;

    return survey.save();
  }

  static async getByUser(input: GetSurveysByUserInputModel): Promise<SurveyTypeModel[]> {
    const user = await UserEntity.findOne({ id: input.userId, active: true });

    if (!user) {
      throw new BaseError(400, ErrorLocale.userNotFound);
    }

    let surveys = await SurveyEntity.find({
      relations: ['user'],
      order: { status: 'ASC', updatedAt: 'DESC' },
      where: { active: true, user: { id: input.userId } },
    });
    if (!surveys) {
      surveys = [];
    }

    return surveys;
  }

  static async publishSurvey(input: PublishSurveyInputModel): Promise<string> {
    const survey = await SurveyEntity.findOne({ id: input.surveyId, active: true });

    if (!survey) {
      throw new BaseError(400, ErrorLocale.surveyNotFound);
    }

    if (survey.status === SurveyStatus.public) {
      throw new BaseError(400, ErrorLocale.surveyIsPublic);
    }

    if (survey.status === SurveyStatus.closed) {
      throw new BaseError(400, ErrorLocale.surveyIsClosed);
    }

    survey.status = SurveyStatus.public;
    await survey.save();

    return SuccessLocale.surveyPublished;
  }
}

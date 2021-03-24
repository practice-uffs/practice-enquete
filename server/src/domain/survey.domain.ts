import {
  CreateSurveyInputModel,
  GetSurveysByUserInputModel,
  ChangeSurveyStatusInputModel,
  SurveyTypeModel,
} from '@domain/model/survey.model';
import { SurveyEntity, SurveyStatus } from '@data/entity/survey.entity';
import { BaseError } from '@api/error/base-error';
import { UserEntity } from '@data/entity/user.entity';
import { SuccessLocale, ErrorLocale } from '@locale';
import { CODE_LENGTH } from './constants';
import { generateRandomCode } from './utils';

export class SurveyDomain {
  static async create(input: CreateSurveyInputModel): Promise<SurveyTypeModel> {
    const user = await UserEntity.findOne({ id: input.userId, active: true });

    if (!user) {
      throw new BaseError(400, ErrorLocale.userNotFound);
    }

    let code: string;
    do {
      code = generateRandomCode(CODE_LENGTH);
    } while (await SurveyEntity.findOne({ code }));

    const survey = SurveyEntity.create({ ...input, code, user });
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

  static async publishSurvey(input: ChangeSurveyStatusInputModel): Promise<string> {
    const survey = await SurveyEntity.findOne({ id: input.surveyId, active: true });

    if (!survey) {
      throw new BaseError(400, ErrorLocale.surveyNotFound);
    }

    if (survey.status === SurveyStatus.published) {
      throw new BaseError(400, ErrorLocale.surveyIsPublished);
    }

    if (survey.status === SurveyStatus.closed) {
      throw new BaseError(400, ErrorLocale.surveyIsClosed);
    }

    survey.status = SurveyStatus.published;
    await survey.save();

    return SuccessLocale.surveyPublished;
  }

  static async closeSurvey(input: ChangeSurveyStatusInputModel): Promise<string> {
    const survey = await SurveyEntity.findOne({ id: input.surveyId, active: true });

    if (!survey) {
      throw new BaseError(400, ErrorLocale.surveyNotFound);
    }

    if (survey.status === SurveyStatus.draft) {
      throw new BaseError(400, ErrorLocale.surveyIsDraft);
    }

    if (survey.status === SurveyStatus.closed) {
      throw new BaseError(400, ErrorLocale.surveyIsClosed);
    }

    survey.status = SurveyStatus.closed;
    await survey.save();

    return SuccessLocale.surveyClosed;
  }
}

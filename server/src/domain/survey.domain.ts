import { SurveyInputModel, SurveyTypeModel } from '@domain/model/survey.model';
import { SurveyEntity } from '@data/entity/survey.entity';
import { BaseError } from '@api/error/base-error';
import { UserEntity } from '@data/entity/user.entity';

export class SurveyDomain {
  static async create(input: SurveyInputModel): Promise<SurveyTypeModel> {
    const user = await UserEntity.findOne({ id: input.userId, active: true });

    if (!user) {
      throw new BaseError(400, 'Usuário não encontrado');
    }

    const survey = SurveyEntity.create(input);
    survey.user = user;

    return survey.save();
  }
}

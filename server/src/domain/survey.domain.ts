import { CreateSurveyInputModel, SurveyTypeModel } from '@domain/model/survey.model';
import { SurveyEntity } from '@data/entity/survey.entity';
import { BaseError } from '@api/error/base-error';
import { UserEntity } from '@data/entity/user.entity';

export class SurveyDomain {
  static async create(input: CreateSurveyInputModel): Promise<SurveyTypeModel> {
    const user = await UserEntity.findOne({ id: input.userId, active: true });

    if (!user) {
      throw new BaseError(400, 'Usuário não encontrado');
    }

    const survey = SurveyEntity.create(input);
    survey.user = user;

    return survey.save();
  }

  static async getByUser(userId: number): Promise<SurveyTypeModel[]> {
    const user = await UserEntity.findOne({ id: userId, active: true });

    if (!user) {
      throw new BaseError(400, 'Usuário não encontrado');
    }

    let surveys = await SurveyEntity.find({
      relations: ['user'],
      order: { status: 'ASC', updatedAt: 'DESC' },
      where: { active: true, user: { id: userId } },
    });
    if (!surveys) {
      surveys = [];
    }

    return surveys;
  }
}

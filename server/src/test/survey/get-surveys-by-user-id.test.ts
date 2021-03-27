import { createRequest } from '@test/create-request';
import { expect } from 'chai';
import { surveyFragment } from '@test/fragment';
import { SurveyEntity } from '@data/entity/survey.entity';
import { UserEntity } from '@data/entity/user.entity';
import { ErrorLocale, ValidationLocale } from '@locale';
import { generateRandomCode } from '@domain/utils';
import { CODE_LENGTH } from '@domain/constants';
import { QuestionContentType, QuestionTypeModel } from '@domain/model';

const query = `
query getSurveysByUser($data: UserIdInput!) {
  getSurveysByUser(data: $data) ${surveyFragment}
}`;

const questions: Array<QuestionTypeModel> = [
  { title: 'Question 1', type: QuestionContentType.shortText, required: true },
  { title: 'Question 2', type: QuestionContentType.longText, required: true },
];

describe('GraphQL: Survey - getSurveysByUser', () => {
  it('should get surveys', async () => {
    let user = UserEntity.create({
      idUFFS: 'user.name',
      name: 'full name',
      email: 'user@gmail.com',
    });
    user = await user.save();

    const surveysDb = [];
    for (let i = 0; i < 5; i++) {
      surveysDb.push(
        SurveyEntity.create({ user, title: 'This is a tile', questions, code: generateRandomCode(CODE_LENGTH) }),
      );
      await surveysDb[i].save();
    }

    const input = { userId: user.id };

    const res = await createRequest(query, { data: input });

    expect(res.body).to.not.own.property('errors');

    const surveys = res.body.data.getSurveysByUser;
    expect(surveys).to.have.lengthOf(surveysDb.length);

    for (let i = 0; i < surveysDb.length; i++) {
      const surveyDb = surveysDb[surveysDb.length - i - 1];
      const survey = surveys[i];

      expect(survey.id).to.be.eq(surveyDb.id);
      expect(survey.title).to.be.eq(surveyDb.title);
      expect(survey.title).to.be.eq(surveyDb.title);
      expect(survey.status).to.be.eq(surveyDb.status);
      expect(survey.code).to.be.eq(surveyDb.code);

      expect(survey.user.id).to.be.eq(user.id);
      expect(survey.user.id).to.be.eq(input.userId);
      expect(survey.user.idUFFS).to.be.eq(user.idUFFS);
      expect(survey.user.name).to.be.eq(user.name);
      expect(survey.user.email).to.be.eq(user.email);

      for (let j = 0; j < survey.length; j++) {
        expect(survey.questions[j]).to.deep.include(surveyDb.questions[j]);
      }
    }
  });

  it('should get zero surveys', async () => {
    let user = UserEntity.create({
      idUFFS: 'user.name',
      name: 'full name',
      email: 'user@gmail.com',
    });
    user = await user.save();

    const surveysDb = [];
    for (let i = 0; i < 5; i++) {
      surveysDb.push(
        SurveyEntity.create({
          user,
          title: 'This is a tile',
          questions,
          code: generateRandomCode(CODE_LENGTH),
          active: false,
        }),
      );
      await surveysDb[i].save();
    }

    const input = { userId: user.id };

    const res = await createRequest(query, { data: input });

    expect(res.body).to.not.own.property('errors');

    const surveys = res.body.data.getSurveysByUser;
    expect(surveys).to.have.lengthOf(0);
  });

  it('should trigger negative id validation error', async () => {
    const input = { userId: -1 };

    const res = await createRequest(query, { data: input });

    expect(res.body.data).to.be.null;

    const errorMessages = res.body.errors.map((error: { message: string }) => error.message);
    expect(errorMessages).to.include(ErrorLocale.invalidArguments);
    const errorIndex = errorMessages.indexOf(ErrorLocale.invalidArguments);

    expect(res.body.errors[errorIndex]).to.own.property('details');
    expect(res.body.errors[errorIndex].details).to.include(ValidationLocale.userIdMin);
  });
});

import { createRequest } from '@test/create-request';
import { expect } from 'chai';
import { surveyFragment } from '../fragment';
import { SurveyEntity } from '@data/entity/survey.entity';
import { UserEntity } from '@data/entity/user.entity';
import { ErrorLocale, ValidationLocale } from '@locale';

const query = `
query getSurveysByUser($data: GetSurveysByUserInput!) {
  getSurveysByUser(data: $data) ${surveyFragment}
}`;

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
      surveysDb.push(SurveyEntity.create({ user, title: 'This is a tile', questions: '[]' }));
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

      expect(survey).to.have.property('id');
      expect(survey).to.deep.include({
        title: surveyDb.title,
        status: surveyDb.status,
        questions: surveyDb.questions,
        code: surveyDb.code,
        user: {
          id: user.id,
          idUFFS: user.idUFFS,
          name: user.name,
          email: user.email,
        },
      });
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
      surveysDb.push(SurveyEntity.create({ user, title: 'This is a tile', questions: '[]', active: false }));
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

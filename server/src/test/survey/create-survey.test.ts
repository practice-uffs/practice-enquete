import { createRequest } from '@test/create-request';
import { expect } from 'chai';
import { createSurveyFragment } from './survey.fragment';
import { SurveyEntity } from '@data/entity/survey.entity';
import { UserSeed } from '@data/seed/user.seed';

describe('GraphQL: Survey - createSurvey', () => {
  it('should create survey', async () => {
    const [user] = await UserSeed(1);

    const input = {
      userId: user.id,
      title: 'This is a title',
      questions: JSON.stringify([{ title: 'Question 1' }, { title: 'Question 2' }, { title: 'Question 3' }]),
    };

    const res = await createRequest(createSurveyFragment, { data: input });

    expect(res.body).to.not.own.property('errors');

    const survey = res.body.data.createSurvey;
    expect(survey).to.have.property('id');
    expect(survey).to.deep.include({
      title: input.title,
      status: 'draft',
      questions: input.questions,
      code: null,
      user: {
        id: user.id,
        idUFFS: user.idUFFS,
        name: user.name,
        email: user.email,
      },
    });

    const surveyDB = await SurveyEntity.findOne(survey.id);
    expect(surveyDB).to.not.be.undefined;
    expect(surveyDB).to.deep.include({
      id: survey.id,
      title: survey.title,
      status: survey.status,
      questions: survey.questions,
      code: survey.code,
    });
  });

  it('should trigger negative id validation error', async () => {
    const input = {
      userId: -1,
      title: 'This is a title',
      questions: JSON.stringify([{ title: 'Question 1' }, { title: 'Question 2' }, { title: 'Question 3' }]),
    };

    const res = await createRequest(createSurveyFragment, { data: input });

    expect(res.body.data).to.be.null;

    const errorMessages = res.body.errors.map((error: { message: string }) => error.message);
    expect(errorMessages).to.include('Argumentos inválidos');
    const errorIndex = errorMessages.indexOf('Argumentos inválidos');

    expect(res.body.errors[errorIndex]).to.own.property('details');
    expect(res.body.errors[errorIndex].details).to.include('O identificador do usuário deve ser maior que zero');
  });

  it('should trigger non-json question validation error', async () => {
    const input = {
      userId: 0,
      title: 'This is a title',
      questions: '',
    };

    const res = await createRequest(createSurveyFragment, { data: input });

    expect(res.body.data).to.be.null;

    const errorMessages = res.body.errors.map((error: { message: string }) => error.message);
    expect(errorMessages).to.include('Argumentos inválidos');
    const errorIndex = errorMessages.indexOf('Argumentos inválidos');

    expect(res.body.errors[errorIndex]).to.own.property('details');
    expect(res.body.errors[errorIndex].details).to.include(
      'As perguntas precisam ser uma lista de objetos transformada em JSON',
    );
  });
});

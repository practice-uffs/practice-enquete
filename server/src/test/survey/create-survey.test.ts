import { createRequest } from '@test/create-request';
import { expect } from 'chai';
import { surveyFragment } from '../fragment';
import { SurveyEntity } from '@data/entity/survey.entity';
import { UserEntity } from '@data/entity/user.entity';
import { CreateSurveyInputModel, QuestionContentType, QuestionTypeModel } from '@domain/model';
import { ErrorLocale, ValidationLocale } from '@locale';

const mutation = `
mutation createSurvey($data: CreateSurveyInput!) {
  createSurvey(data: $data) ${surveyFragment}
}`;

const questions: Array<QuestionTypeModel> = [
  { title: 'Question 1', type: QuestionContentType.shortText, required: true },
  { title: 'Question 2', type: QuestionContentType.longText, required: false },
];

describe('GraphQL: Survey - createSurvey', () => {
  it('should create survey', async () => {
    let user = UserEntity.create({
      idUFFS: 'user.name',
      name: 'full name',
      email: 'user@gmail.com',
    });
    user = await user.save();

    const input: CreateSurveyInputModel = {
      userId: user.id,
      title: 'This is a title',
      questions,
    };

    const res = await createRequest(mutation, { data: input });

    expect(res.body).to.not.own.property('errors');
    const survey = res.body.data.createSurvey;

    const surveyDb = await SurveyEntity.findOneOrFail(survey.id);

    expect(survey.id).to.be.eq(surveyDb.id);
    expect(survey.title).to.be.eq(surveyDb.title);
    expect(survey.title).to.be.eq(input.title);
    expect(survey.status).to.be.eq(surveyDb.status);
    expect(survey.code).to.be.eq(surveyDb.code);

    expect(survey.user.id).to.be.eq(user.id);
    expect(survey.user.id).to.be.eq(input.userId);
    expect(survey.user.idUFFS).to.be.eq(user.idUFFS);
    expect(survey.user.name).to.be.eq(user.name);
    expect(survey.user.email).to.be.eq(user.email);

    for (let i = 0; i < survey.length; i++) {
      expect(survey.questions[i]).to.deep.include(input.questions[i]);
    }
  });

  it('should trigger user not found error', async () => {
    const input: CreateSurveyInputModel = {
      userId: 0,
      title: 'This is a title',
      questions,
    };

    const res = await createRequest(mutation, { data: input });

    expect(res.body.data).to.be.null;
    expect(res.body.errors).to.deep.include({ code: 400, message: ErrorLocale.userNotFound });
  });

  it('should trigger negative id validation error', async () => {
    const input: CreateSurveyInputModel = {
      userId: -1,
      title: 'This is a title',
      questions,
    };

    const res = await createRequest(mutation, { data: input });

    expect(res.body.data).to.be.null;

    const errorMessages = res.body.errors.map((error: { message: string }) => error.message);
    expect(errorMessages).to.include(ErrorLocale.invalidArguments);
    const errorIndex = errorMessages.indexOf(ErrorLocale.invalidArguments);

    expect(res.body.errors[errorIndex]).to.own.property('details');
    expect(res.body.errors[errorIndex].details).to.include(ValidationLocale.surveyIdMin);
  });

  it('should trigger input error', async () => {
    const input = {
      userId: 0,
      title: 'This is a title',
      questions: {},
    };

    await createRequest(mutation, { data: input }, undefined, 400);
  });
});

import { createRequest } from '@test/create-request';
import { expect } from 'chai';
import { SurveyEntity } from '@data/entity/survey.entity';
import { UserEntity } from '@data/entity/user.entity';
import { QuestionContentType, QuestionTypeModel, SurveyIdInputModel, SurveyStatus } from '@domain/model';
import { ErrorLocale, SuccessLocale, ValidationLocale } from '@locale';
import { CODE_LENGTH } from '@domain/constants';
import { generateRandomCode } from '@domain/utils';

const mutation = `
mutation publishSurvey($data: SurveyIdInput!) {
  publishSurvey(data: $data)
}`;

const questions: Array<QuestionTypeModel> = [
  { title: 'Question 1', type: QuestionContentType.shortText, required: true },
  { title: 'Question 2', type: QuestionContentType.longText, required: true },
];

describe('GraphQL: Survey - publishSurvey', () => {
  it('should publish survey', async () => {
    const user = UserEntity.create({
      idUFFS: 'user.name',
      name: 'full name',
      email: 'user@gmail.com',
    });
    await user.save();

    const survey = SurveyEntity.create({
      user,
      code: generateRandomCode(CODE_LENGTH),
      title: 'This is a title',
      questions,
    });
    await survey.save();

    const input: SurveyIdInputModel = {
      surveyId: survey.id,
    };

    const res = await createRequest(mutation, { data: input });

    expect(res.body).to.not.own.property('errors');
    expect(res.body.data.publishSurvey).to.be.eq(SuccessLocale.surveyPublished);

    const surveyDb = await SurveyEntity.findOne(survey.id);
    expect(surveyDb?.status).to.be.eq(SurveyStatus.published);
  });

  it('should trigger survey not found error', async () => {
    const input: SurveyIdInputModel = {
      surveyId: 0,
    };

    const res = await createRequest(mutation, { data: input });

    expect(res.body.data).to.be.null;
    expect(res.body.errors).to.deep.include({ code: 400, message: ErrorLocale.surveyNotFound });
  });

  it('should trigger survey is published error', async () => {
    const user = UserEntity.create({
      idUFFS: 'user.name',
      name: 'full name',
      email: 'user@gmail.com',
    });
    await user.save();

    const survey = SurveyEntity.create({
      user,
      code: generateRandomCode(CODE_LENGTH),
      title: 'This is a title',
      status: SurveyStatus.published,
      questions,
    });
    await survey.save();

    const input: SurveyIdInputModel = {
      surveyId: survey.id,
    };

    const res = await createRequest(mutation, { data: input });

    expect(res.body.data).to.be.null;
    expect(res.body.errors).to.deep.include({ code: 400, message: ErrorLocale.surveyIsPublished });
  });

  it('should trigger survey is closed error', async () => {
    const user = UserEntity.create({
      idUFFS: 'user.name',
      name: 'full name',
      email: 'user@gmail.com',
    });
    await user.save();

    const survey = SurveyEntity.create({
      user,
      code: generateRandomCode(CODE_LENGTH),
      title: 'This is a title',
      status: SurveyStatus.closed,
      questions,
    });
    await survey.save();

    const input: SurveyIdInputModel = {
      surveyId: survey.id,
    };

    const res = await createRequest(mutation, { data: input });

    expect(res.body.data).to.be.null;
    expect(res.body.errors).to.deep.include({ code: 400, message: ErrorLocale.surveyIsClosed });
  });

  it('should trigger negative id validation error', async () => {
    const input: SurveyIdInputModel = {
      surveyId: -1,
    };

    const res = await createRequest(mutation, { data: input });

    expect(res.body.data).to.be.null;

    const errorMessages = res.body.errors.map((error: { message: string }) => error.message);
    expect(errorMessages).to.include(ErrorLocale.invalidArguments);
    const errorIndex = errorMessages.indexOf(ErrorLocale.invalidArguments);

    expect(res.body.errors[errorIndex]).to.own.property('details');
    expect(res.body.errors[errorIndex].details).to.include(ValidationLocale.surveyIdMin);
  });
});

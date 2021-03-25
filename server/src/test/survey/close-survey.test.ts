import { createRequest } from '@test/create-request';
import { expect } from 'chai';
import { SurveyEntity, SurveyStatus } from '@data/entity/survey.entity';
import { UserEntity } from '@data/entity/user.entity';
import { SurveyIdInputModel } from '@domain/model';
import { ErrorLocale, SuccessLocale, ValidationLocale } from '@locale';
import { CODE_LENGTH } from '@domain/constants';
import { generateRandomCode } from '@domain/utils';

const mutation = `
mutation closeSurvey($data: SurveyIdInput!) {
  closeSurvey(data: $data)
}`;

describe('GraphQL: Survey - closeSurvey', () => {
  it('should close survey', async () => {
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
      questions: JSON.stringify([{ title: 'Question 1' }, { title: 'Question 2' }, { title: 'Question 3' }]),
    });
    await survey.save();

    const input: SurveyIdInputModel = {
      surveyId: survey.id,
    };

    const res = await createRequest(mutation, { data: input });

    expect(res.body).to.not.own.property('errors');
    expect(res.body.data.closeSurvey).to.be.eq(SuccessLocale.surveyClosed);

    const surveyDb = await SurveyEntity.findOne(survey.id);
    expect(surveyDb?.status).to.be.eq(SurveyStatus.closed);
  });

  it('should trigger survey not found error', async () => {
    const input: SurveyIdInputModel = {
      surveyId: 0,
    };

    const res = await createRequest(mutation, { data: input });

    expect(res.body.data).to.be.null;
    expect(res.body.errors).to.deep.include({ code: 400, message: ErrorLocale.surveyNotFound });
  });

  it('should trigger survey is draft error', async () => {
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
      status: SurveyStatus.draft,
      questions: JSON.stringify([{ title: 'Question 1' }, { title: 'Question 2' }, { title: 'Question 3' }]),
    });
    await survey.save();

    const input: SurveyIdInputModel = {
      surveyId: survey.id,
    };

    const res = await createRequest(mutation, { data: input });

    expect(res.body.data).to.be.null;
    expect(res.body.errors).to.deep.include({ code: 400, message: ErrorLocale.surveyIsDraft });
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
      questions: JSON.stringify([{ title: 'Question 1' }, { title: 'Question 2' }, { title: 'Question 3' }]),
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

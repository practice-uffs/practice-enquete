import { createRequest } from '@test/create-request';
import { expect } from 'chai';
import { SurveyEntity, SurveyStatus } from '@data/entity/survey.entity';
import { UserEntity } from '@data/entity/user.entity';
import { PublishSurveyInputModel } from '@domain/model/survey.model';

const mutation = `
mutation publishSurvey($data: PublishSurveyInput!) {
  publishSurvey(data: $data)
}`;

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
      title: 'This is a title',
      questions: JSON.stringify([{ title: 'Question 1' }, { title: 'Question 2' }, { title: 'Question 3' }]),
    });
    await survey.save();

    const input: PublishSurveyInputModel = {
      surveyId: survey.id,
    };

    const res = await createRequest(mutation, { data: input });

    expect(res.body).to.not.own.property('errors');
    expect(res.body.data.publishSurvey).to.be.eq('Enquete publicada com sucesso');
  });

  it('should trigger duplicate email error', async () => {
    const input: PublishSurveyInputModel = {
      surveyId: 0,
    };

    const res = await createRequest(mutation, { data: input });

    expect(res.body.data).to.be.null;
    expect(res.body.errors).to.deep.include({ code: 400, message: 'Esta enquete não foi encontrada' });
  });

  it('should trigger duplicate email error', async () => {
    const user = UserEntity.create({
      idUFFS: 'user.name',
      name: 'full name',
      email: 'user@gmail.com',
    });
    await user.save();

    const survey = SurveyEntity.create({
      user,
      title: 'This is a title',
      status: SurveyStatus.public,
      questions: JSON.stringify([{ title: 'Question 1' }, { title: 'Question 2' }, { title: 'Question 3' }]),
    });
    await survey.save();

    const input: PublishSurveyInputModel = {
      surveyId: survey.id,
    };

    const res = await createRequest(mutation, { data: input });

    expect(res.body.data).to.be.null;
    expect(res.body.errors).to.deep.include({ code: 400, message: 'Esta enquete já está publicada' });
  });

  it('should trigger duplicate email error', async () => {
    const user = UserEntity.create({
      idUFFS: 'user.name',
      name: 'full name',
      email: 'user@gmail.com',
    });
    await user.save();

    const survey = SurveyEntity.create({
      user,
      title: 'This is a title',
      status: SurveyStatus.closed,
      questions: JSON.stringify([{ title: 'Question 1' }, { title: 'Question 2' }, { title: 'Question 3' }]),
    });
    await survey.save();

    const input: PublishSurveyInputModel = {
      surveyId: survey.id,
    };

    const res = await createRequest(mutation, { data: input });

    expect(res.body.data).to.be.null;
    expect(res.body.errors).to.deep.include({ code: 400, message: 'Esta enquete está fechada' });
  });

  it('should trigger negative id validation error', async () => {
    const input: PublishSurveyInputModel = {
      surveyId: -1,
    };

    const res = await createRequest(mutation, { data: input });

    expect(res.body.data).to.be.null;

    const errorMessages = res.body.errors.map((error: { message: string }) => error.message);
    expect(errorMessages).to.include('Argumentos inválidos');
    const errorIndex = errorMessages.indexOf('Argumentos inválidos');

    expect(res.body.errors[errorIndex]).to.own.property('details');
    expect(res.body.errors[errorIndex].details).to.include('O identificador da enquete deve ser maior que zero');
  });
});

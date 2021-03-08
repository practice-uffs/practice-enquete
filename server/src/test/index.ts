import supertest, { CallbackHandler } from 'supertest';
import bcrypt from 'bcrypt';

import { expect } from 'chai';

import { Connection } from '@data/config/connection';
import { Server } from '@api/server/server';

import { UserInput } from '@api/schema/user/user.input';
import { UserEntity } from '@data/entity/user.entity';

const url: string = `http://localhost:3000`;
const request = supertest(url);

let connection: any;
let server: any;

before(async () => {
  connection = await Connection();
  server = await Server();
});

describe('GraphQL: Hello query', () => {
  it('should return successfully', (done) => {
    request
      .post('/')
      .send({
        query: '{ hello }',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.data).to.be.deep.eq({ hello: '👋 Hello world! 👋' });
        done();
      });
  });
});

describe('GraphQL: User - createUser', () => {
  const createRequest = (input: UserInput, callback: CallbackHandler) => {
    const mutation = `
      mutation createUser($data: UserInput!) {
        createUser(data: $data) {
          id
          name
          email
          birthDate
        }
      }`;
    return request
      .post('/')
      .send({
        query: mutation,
        variables: {
          data: input,
        },
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(callback);
  };

  it('should create user successfully', (done) => {
    const input: UserInput = {
      name: 'Luke Skywalker',
      email: 'skylwalker.top@gmail.com',
      password: 'a1ÊÇ7ma2',
      birthDate: new Date(),
    };

    createRequest(input, async (err, res) => {
      if (err) {
        return done(err);
      }

      expect(res.body).to.not.own.property('errors');
      expect(res.body.data.createUser).to.have.property('id');
      expect(res.body.data.createUser).to.include({
        name: input.name,
        email: input.email,
        birthDate: input.birthDate.toISOString(),
      });

      const user = (await UserEntity.findOne(res.body.data.createUser.id)) as UserEntity;
      expect(user).to.not.be.undefined;
      expect(await bcrypt.compare(input.password, user.password)).to.be.true;
      expect(user).to.deep.include({
        id: res.body.data.createUser.id,
        name: input.name,
        email: input.email,
        birthDate: input.birthDate,
      });

      return done();
    });
  });

  it('should trigger duplicate email error', (done) => {
    const input: UserInput = {
      name: 'Anakin Skywalker',
      email: 'skylwalker.top@gmail.com',
      password: 'é8Ç7qwa2',
      birthDate: new Date(),
    };

    createRequest(input, async (err, res) => {
      if (err) {
        return done(err);
      }

      expect(res.body.data).to.be.null;
      expect(res.body).to.own.property('errors');

      const errorMessages = res.body.errors.map((error: { message: string }) => error.message);
      expect(errorMessages).to.include('Email já cadastrado');

      return done();
    });
  });

  it('should trigger email validation error', (done) => {
    const input: UserInput = {
      name: 'Anakin Skywalker',
      email: 'wrong email',
      password: 'é8Ç7qwa2',
      birthDate: new Date(),
    };

    createRequest(input, async (err, res) => {
      if (err) {
        return done(err);
      }

      expect(res.body.data).to.be.null;
      expect(res.body).to.own.property('errors');

      const errorMessages = res.body.errors.map((error: { message: string }) => error.message);
      expect(errorMessages).to.include('Argumentos inválidos');
      const errorIndex = errorMessages.indexOf('Argumentos inválidos');

      expect(res.body.errors[errorIndex]).to.own.property('details');
      expect(res.body.errors[errorIndex].details).to.include('O email precisa ser um endereço de e-mail válido');

      return done();
    });
  });

  it('should trigger password validation error', (done) => {
    const input: UserInput = {
      name: 'Anakin Skywalker',
      email: 'vader.darth@yahoo.com',
      password: 'aaaaaa',
      birthDate: new Date(),
    };

    createRequest(input, async (err, res) => {
      if (err) {
        return done(err);
      }

      expect(res.body.data).to.be.null;
      expect(res.body).to.own.property('errors');

      const errorMessages = res.body.errors.map((error: { message: string }) => error.message);
      expect(errorMessages).to.include('Argumentos inválidos');
      const errorIndex = errorMessages.indexOf('Argumentos inválidos');

      expect(res.body.errors[errorIndex]).to.own.property('details');
      expect(res.body.errors[errorIndex].details).to.include('A senha precisa ter pelo menos 7 caracteres');
      expect(res.body.errors[errorIndex].details).to.include('A senha precisa ter pelo uma letra e um número');

      return done();
    });
  });
});

after(async () => {
  await UserEntity.clear();
});

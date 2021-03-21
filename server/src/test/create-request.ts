import request from 'supertest';

export const createRequest = (query: string, variables?: object, token?: string, status: number = 200) => {
  const agent = request.agent('http://localhost:3000').post('/').set('Accept', 'application/json');

  if (token) {
    agent.set('Authorization', `Bearer ${token}`);
  }

  return agent
    .send({
      query,
      variables,
    })
    .expect('Content-Type', /json/)
    .expect(status);
};

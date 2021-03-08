import request from 'supertest';

export const Request = (query: string, variables?: object, token?: string) => {
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
    .expect(200);
};

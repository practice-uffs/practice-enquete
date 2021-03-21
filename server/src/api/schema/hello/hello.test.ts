import { createRequest } from '@test/create-request';
import { expect } from 'chai';

describe('GraphQL: Hello query', () => {
  it('should return successfully', async () => {
    const res = await createRequest('{ hello }');

    expect(res.body.data).to.be.deep.eq({ hello: '👋 Hello world! 👋' });
  });
});

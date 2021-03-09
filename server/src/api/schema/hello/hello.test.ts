import { Request } from '@test/request';
import { expect } from 'chai';

describe('GraphQL: Hello query', () => {
  it('should return successfully', async () => {
    const res = await Request('{ hello }');

    expect(res.body.data).to.be.deep.eq({ hello: '👋 Hello world! 👋' });
  });
});

import 'graphql-import-node';
import { GraphQLSchema } from 'graphql';
import { buildSchemaSync } from 'type-graphql';
import { HelloResolver } from './hello/hello.resolver';
import { Authenticator } from '@api/server/authenticator';

// Load resolvers
export const Schema: GraphQLSchema = buildSchemaSync({
  resolvers: [HelloResolver],
  authChecker: Authenticator.authChecker,
});

import 'graphql-import-node';
import path from 'path';
import { GraphQLSchema } from 'graphql';
import { buildSchemaSync } from 'type-graphql';
import { Authenticator } from '@api/server/authenticator';

export const Schema: GraphQLSchema = buildSchemaSync({
  resolvers: [path.join(__dirname, '.') + '/**/*.resolver.{ts,js}'],
  authChecker: Authenticator.authChecker,
});

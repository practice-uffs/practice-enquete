import 'graphql-import-node';
import { GraphQLSchema } from 'graphql';
import { buildSchemaSync } from 'type-graphql';
import { HelloResolver } from './hello/hello.resolver';
import { UserResolver } from './user/user.resolver';
import { LoginResolver } from './login/login.resolver';
import { Authenticator } from '@api/server/authenticator';

// Load resolvers
export const Schema: GraphQLSchema = buildSchemaSync({
  resolvers: [HelloResolver, UserResolver, LoginResolver],
  authChecker: Authenticator.authChecker,
});

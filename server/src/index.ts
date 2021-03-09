import 'reflect-metadata';
import { Connection } from './data/config/connection';
import { Server } from './api/server/server';

// Database connection
Connection().then(() => {
  console.log(`✓ Database connected`);
  Server().then(() => {
    console.log(
      `✓ GraphQL is running on http://localhost:${process.env.PORT}${process.env.GRAPHQL_PLAYGROUND_ENDPOINT}`,
    );
  });
});

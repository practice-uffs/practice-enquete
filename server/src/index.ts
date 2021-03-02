import 'reflect-metadata';
import { LocalDB } from './data/connection/local.db';
import { createServer } from 'http';
import { App } from './app';

// Database connection
LocalDB.then(() => console.log('🟢 Database connected')).catch(() => console.log('🔴 Database not connected!'));

// Server listening
const httpServer = createServer(App);
httpServer.listen({ port: 3000 }, () => console.log(`🟢 GraphQL is running on http://localhost:3000/graphql`));

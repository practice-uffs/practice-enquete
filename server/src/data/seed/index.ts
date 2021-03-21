import 'reflect-metadata';
import { Server } from '@api/server/server';
import { Connection } from '@data/config/connection';
import { UserSeed } from './user.seed';

const DatabaseSeed = async () => {
  const connection = await Connection();
  const server = await Server();
  console.info('Seeding started\n');

  await UserSeed();
  console.info('✓ Users created');

  connection.close();
  server.close();
};

DatabaseSeed();

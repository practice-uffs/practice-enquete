import * as path from 'path';
import { createConnection } from 'typeorm';

export const LocalDB = createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'user_crud',
  entities: [path.join(__dirname, '..') + '/entity/*.{ts,js}'],
  synchronize: true,
  logging: false,
});

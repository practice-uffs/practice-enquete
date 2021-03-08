import * as path from 'path';
import { createConnection, Connection as TypeORMConnection } from 'typeorm';

export const Connection = (): Promise<TypeORMConnection> => {
  return createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [path.join(__dirname, '..') + '/entity/*.{ts,js}'],
    synchronize: true,
    logging: false,
  })
};

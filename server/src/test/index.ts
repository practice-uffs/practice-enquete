import { Connection } from '@data/config/connection';
import { Server } from '@api/server/server';

import { SurveyEntity } from '@data/entity/survey.entity';

import * as glob from 'glob';
import * as path from 'path';

before(async () => {
  await Connection();
  await Server();
});

['src/**/*.test.ts']
  .reduce<string[]>((allDirs, dir) => allDirs.concat(glob.sync(path.normalize(dir))), [])
  .map((file) => file.replace('src/', '').replace('.ts', ''))
  .forEach((file) => require(file));

afterEach(async () => {
  await SurveyEntity.clear();
});

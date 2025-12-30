import * as path from 'path';

import { LuneMigration } from '@lunejs/core';
import { config } from 'dotenv';

config({ path: path.resolve(process.cwd(), './scripts/.env.migration') });

const luneMigration = new LuneMigration(process.env.DATABASE_URL as string);

luneMigration
  .runMigrations()
  .catch((err) => console.error(err))
  .finally(() => process.exit(0));

import { LuneMigration } from '@lune/core';
import { config } from 'dotenv';

config();

const luneMigration = new LuneMigration(process.env.DATABASE_URL as string);

luneMigration
  .runMigrations()
  .catch((err) => console.error(err))
  .finally(() => process.exit(0));

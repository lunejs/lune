import { VendyxMigration } from '@vendyx/core';
import { config } from 'dotenv';

config();

const vendyxMigration = new VendyxMigration(process.env.DATABASE_URL as string);

vendyxMigration
  .runMigrations()
  .catch((err) => console.error(err))
  .finally(() => process.exit(0));

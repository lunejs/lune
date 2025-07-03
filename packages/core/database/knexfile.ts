import type { Knex } from 'knex';
import dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'local';

const envPaths = {
  ['local']: '.env.migration.local',
  ['test']: '.env.migration.test'
};

dotenv.config({ path: `${envPaths[env]}` });

const config: Record<string, Knex.Config> = {
  local: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  },
  test: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};

module.exports = config;

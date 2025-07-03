import type { Knex } from 'knex';

const config: Record<string, Knex.Config> = {
  local: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  },
  test: {
    client: 'pg',
    connection: process.env.ADMIN_DATABASE_URL
  }
};

module.exports = config;

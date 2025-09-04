import knex, { Knex } from 'knex';

import { getConfig } from '@/config/config';

export const createConnection = (): Database => {
  const { url } = getConfig().db;

  return knex({
    client: 'pg',
    connection: url
  });
};

export type Database = knex.Knex<any, unknown[]>;
export type Transaction = Knex.Transaction<any, any[]>;

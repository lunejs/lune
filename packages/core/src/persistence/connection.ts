import { getConfig } from '@/config/config';
import knex, { Knex } from 'knex';

export const createConnection = (): Database => {
  const { url } = getConfig().db;

  return knex({
    client: 'pg',
    connection: url
  });
};

export type Database = knex.Knex<any, unknown[]>;
export type Transaction = Knex.Transaction<any, any[]>;

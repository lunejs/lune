import type { Knex } from 'knex';
import knex from 'knex';

export const createConnection = (url: string): Database => {
  return knex({
    client: 'pg',
    connection: url
  });
};

export type Database = knex.Knex<any, unknown[]>;
export type Transaction = Knex.Transaction<any, any[]>;

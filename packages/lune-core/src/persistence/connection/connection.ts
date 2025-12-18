import type { Knex } from 'knex';
import knex from 'knex';

export const createConnection = (url: string): Database => {
  return knex({
    client: 'pg',
    connection: url
  });
};

// TODO: remove this and use the ones in types.ts
export type Database = knex.Knex<any, unknown[]>;
export type Transaction = Knex.Transaction<any, any[]>;

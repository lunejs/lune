import knex, { Knex } from 'knex';

export const createConnection = (): Database => {
  return knex({
    client: 'pg',
    connection: process.env.DATABASE_URL,
  });
};

export type Database = knex.Knex<any, unknown[]>;
export type Transaction = Knex.Transaction<any, any[]>;

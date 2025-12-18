import type { Knex } from 'knex';
import type knex from 'knex';

export type Database = knex.Knex<any, unknown[]>;
export type Transaction = Knex.Transaction<any, any[]>;

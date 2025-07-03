import knex from 'knex';

export const setupTestDb = () => {
  return knex({
    client: 'pg',
    connection: process.env.DATABASE_URL
  });
};

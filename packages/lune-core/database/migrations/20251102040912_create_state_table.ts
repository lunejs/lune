import type { Knex } from 'knex';

const TABLE_NAME = 'state';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());

    table.string('name', 255).notNullable();
    table.string('code', 5).notNullable().unique();

    table.uuid('country_id').notNullable().references('id').inTable('country');

    table.unique(['country_id', 'code']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

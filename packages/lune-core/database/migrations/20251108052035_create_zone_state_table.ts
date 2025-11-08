import type { Knex } from 'knex';

const TABLE_NAME = 'zone_state';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, table => {
    table.uuid('zone_id').notNullable().references('id').inTable('zone');
    table.uuid('state_id').notNullable().references('id').inTable('state');

    table.primary(['collection_id', 'product_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TABLE_NAME);
}

import type { Knex } from 'knex';

const TABLE_NAME = 'product_collection';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, table => {
    table.uuid('product_id').notNullable().references('id').inTable('product');
    table.uuid('collection_id').notNullable().references('id').inTable('collection');

    table.primary(['product_id', 'collection_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TABLE_NAME);
}

import type { Knex } from 'knex';

const TABLE_NAME = 'collection_product';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, table => {
    table.uuid('collection_id').notNullable().references('id').inTable('collection');
    table.uuid('product_id').notNullable().references('id').inTable('product');

    table.primary(['collection_id', 'product_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TABLE_NAME);
}

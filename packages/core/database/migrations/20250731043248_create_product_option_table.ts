import type { Knex } from 'knex';

const TABLE_NAME = 'product_option';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, table => {
    table.uuid('product_id').notNullable().references('id').inTable('product');

    table.uuid('option_id').notNullable().references('id').inTable('option');

    table.primary(['product_id', 'option_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TABLE_NAME);
}

import type { Knex } from 'knex';

const TABLE_NAME = 'variant_asset';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, table => {
    table.uuid('variant_id').notNullable().references('id').inTable('variant');
    table.uuid('asset_id').notNullable().references('id').inTable('asset');

    table.integer('order').notNullable();

    table.primary(['variant_id', 'asset_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TABLE_NAME);
}

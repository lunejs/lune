import type { Knex } from 'knex';

const TABLE_NAME = 'variant_option_value';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, table => {
    table.uuid('variant_id').notNullable().references('id').inTable('variant');

    table.uuid('option_value_id').notNullable().references('id').inTable('option_value');

    table.primary(['variant_id', 'option_value_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TABLE_NAME);
}

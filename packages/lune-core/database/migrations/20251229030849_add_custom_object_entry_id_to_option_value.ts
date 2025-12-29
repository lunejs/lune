import type { Knex } from 'knex';

const TABLE_NAME = 'option_value';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TABLE_NAME, table => {
    table.uuid('custom_object_entry_id').nullable().references('id').inTable('custom_object_entry');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TABLE_NAME, table => {
    table.dropColumn('custom_object_entry_id');
  });
}

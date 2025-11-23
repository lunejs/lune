import type { Knex } from 'knex';

const TABLE_NAME = 'option_value_preset';
const OPTION_VALUE_TABLE_NAME = 'option_value';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());

    table.string('name').notNullable();
    table.jsonb('metadata').nullable();

    table.uuid('option_preset_id').notNullable().references('id').inTable('option_preset');

    table
      .uuid('shop_id')
      .notNullable()
      .defaultTo(knex.raw(`(current_setting('app.current_shop_id'::text))::uuid`))
      .references('id')
      .inTable('shop');

    table.unique(['name', 'option_preset_id']);
  });

  await knex.schema.alterTable(OPTION_VALUE_TABLE_NAME, table => {
    table.uuid('option_value_preset_id').nullable().references('id').inTable(TABLE_NAME);
    table.string('name').nullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(OPTION_VALUE_TABLE_NAME, table => {
    table.dropColumn('option_value_preset_id');
    table.string('name').notNullable().alter();
  });
  await knex.schema.dropTableIfExists(TABLE_NAME);
}

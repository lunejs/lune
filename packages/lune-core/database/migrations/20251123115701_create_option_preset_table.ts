import type { Knex } from 'knex';

const TABLE_NAME = 'option_preset';
const OPTION_TABLE = 'option';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());

    table.string('name').notNullable();

    table
      .uuid('shop_id')
      .notNullable()
      .defaultTo(knex.raw(`(current_setting('app.current_shop_id'::text))::uuid`))
      .references('id')
      .inTable('shop');

    table.unique(['name', 'shop_id']);
  });

  await knex.schema.alterTable(OPTION_TABLE, table => {
    table.uuid('option_preset_id').nullable().references('id').inTable(TABLE_NAME);
    table.string('name').nullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(OPTION_TABLE, table => {
    table.dropColumn('option_preset_id');
    table.string('name').notNullable().alter();
  });

  await knex.schema.dropTableIfExists(TABLE_NAME);
}

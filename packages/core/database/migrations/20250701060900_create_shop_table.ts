import type { Knex } from 'knex';

const TABLE_NAME = 'shop';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());

    table.string('name').notNullable();
    table.string('slug').unique().notNullable();
    table.string('shop_api_key').unique().notNullable();
    table.string('email').unique().notNullable();
    table.string('phone_number', 15).notNullable();
    table.string('logo').nullable();
    table.jsonb('socials').nullable();
    table.string('storefront_url').unique().nullable();

    table
      .uuid('owner_id')
      .notNullable()
      .defaultTo(knex.raw(`(current_setting('app.current_owner_id'))::uuid`))
      .references('id')
      .inTable('users');

    table.index(['owner_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TABLE_NAME);
}

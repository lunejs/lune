import type { Knex } from 'knex';

const TABLE_NAME = 'customer';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());

    table.string('email', 255).notNullable().unique();
    table.string('first_name', 100).nullable();
    table.string('last_name', 100).nullable();
    table.string('password').nullable();
    table.string('phone_number', 15).nullable();
    table.boolean('enabled').notNullable().defaultTo(true);

    table
      .uuid('shop_id')
      .notNullable()
      .defaultTo(knex.raw(`(current_setting('app.current_shop_id'::text))::uuid`))
      .references('id')
      .inTable('shop');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TABLE_NAME);
}

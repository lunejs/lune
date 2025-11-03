import type { Knex } from 'knex';

const TABLE_NAME = 'payment';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());

    table.string('transaction_id').nullable();
    table.integer('amount').notNullable();
    table.string('method').notNullable();
    table
      .enum('state', [
        'PENDING',
        'SUBMITTED',
        'AUTHORIZED',
        'CAPTURED',
        'FAILED',
        'REJECTED',
        'CANCELED'
      ])
      .notNullable();

    table.uuid('order_id').notNullable().references('id').inTable('orders');
    table.uuid('payment_method_id').notNullable().references('id').inTable('payment_method');

    table
      .uuid('shop_id')
      .notNullable()
      .defaultTo(knex.raw(`(current_setting('app.current_shop_id'::text))::uuid`))
      .references('id')
      .inTable('shop');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

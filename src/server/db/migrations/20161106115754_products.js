exports.up = (knex, Promise) => {
  return knex.schema.createTable('products', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.text('description').notNullable();
    table.decimal('amount').notNullable();
    table.string('currency').notNullable().defaultTo('USD');
    table.boolean('available').notNullable().defaultTo(true);
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('products');
};

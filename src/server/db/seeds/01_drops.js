exports.seed = (knex, Promise) => {
  return Promise.all([
    knex('transactions').del(),
    knex('products').del(),
    knex('users').del()
  ]);
};

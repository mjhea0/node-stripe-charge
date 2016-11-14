exports.seed = (knex, Promise) => {
  return Promise.all([
    knex('products').insert({
      name: 'Large Shirt',
      description: 'Just a large shirt.',
      amount: 30.00
    }),
    knex('products').insert({
      name: 'Medium Shirt',
      description: 'Just a medium shirt.',
      amount: 20.00
    }),
    knex('products').insert({
      name: 'Small Shirt',
      description: 'Just a small shirt.',
      amount: 10.00
    })
  ]);
};

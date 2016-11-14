const bcrypt = require('bcryptjs');

exports.seed = (knex, Promise) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync('admin', salt);
  return Promise.join(
    knex('users').insert({
      email: 'ad@min.com',
      password: hash,
      admin: true
    })
  );
};

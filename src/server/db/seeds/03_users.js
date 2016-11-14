const bcrypt = require('bcryptjs');

exports.seed = (knex, Promise) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync('johnson123', salt);
  return Promise.join(
    knex('users').insert({
      email: 'jeremy@realpython.com',
      password: hash
    })
  );
};

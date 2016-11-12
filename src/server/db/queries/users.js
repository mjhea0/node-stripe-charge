const knex = require('../connection');

function getUserByEmail(email) {
  return knex('users')
  .where('email', email)
  .first();
}

module.exports = {
  getUserByEmail
};

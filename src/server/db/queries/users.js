const knex = require('../connection');

function getUserByEmail(email) {
  return knex('users')
  .where('email', email)
  .first();
}

function getUserByID(userID) {
  return knex('users')
  .where('id', parseInt(userID))
  .first();
}

module.exports = {
  getUserByEmail,
  getUserByID
};

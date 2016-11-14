const knex = require('../connection');

function getAllUsers() {
  return knex('users').select('*');
}

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

function addUser(obj) {
  return knex('users').insert(obj).returning('*');
}

function updateUser(userID, obj) {
  return knex('users')
  .update(obj)
  .where('id', parseInt(userID))
  .returning('*');
}

function deleteUser(userID) {
  return knex('users')
  .where('id', parseInt(userID))
  .del()
  .returning('*');
}

module.exports = {
  getAllUsers,
  getUserByEmail,
  getUserByID,
  addUser,
  updateUser,
  deleteUser
};

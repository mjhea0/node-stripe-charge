const express = require('express');
const router = express.Router();

const authHelpers = require('../../auth/_helpers');
const transactionQueries = require('../../db/queries/transactions');
const userQueries = require('../../db/queries/users');

// get ALL users
router.get('/', authHelpers.adminRequiredJSON, (req, res, next) => {
  return userQueries.getAllUsers()
  .then((users) => {
    return res.status(200)
    .json({
      status: 'success',
      data: users,
      message: 'Retrieved all users.'
    });
  })
  .catch((err) => { return next(err); });
});

// get SINGLE user
router.get('/:id', authHelpers.adminRequiredJSON, (req, res, next) => {
  userQueries.getUserByID(parseInt(req.params.id))
  .then((user) => {
    return res.status(200)
    .json({
      status: 'success',
      data: {
        email: user.email,
        admin: user.admin
      },
      message: 'Retrieved single user.'
    });
  })
  .catch((err) => { return next(err); });
});

// add new user
router.post('/', authHelpers.adminRequiredJSON, (req, res, next) => {
  userQueries.addUser(req.body)
  .then((user) => {
    return res.status(200)
    .json({
      status: 'success',
      data: {
        email: user[0].email,
        admin: user[0].admin
      },
      message: 'Created user.'
    });
  })
  .catch((err) => { return next(err); });
});

// update SINGLE user
router.put('/:id', authHelpers.adminRequiredJSON, (req, res, next) => {
  userQueries.updateUser(parseInt(req.params.id), req.body)
  .then((user) => {
    return res.status(200)
    .json({
      status: 'success',
      data: {
        email: user[0].email,
        admin: user[0].admin
      },
      message: 'Updated user.'
    });
  })
  .catch((err) => { return next(err); });
});

// delete SINGLE user
router.delete('/:id', authHelpers.adminRequiredJSON, (req, res, next) => {
  userQueries.deleteUser(parseInt(req.params.id))
  .then((user) => {
    return res.status(200)
    .json({
      status: 'success',
      data: {
        email: user[0].email,
        admin: user[0].admin
      },
      message: 'Removed user.'
    });
  })
  .catch((err) => { return next(err); });
});

module.exports = router;

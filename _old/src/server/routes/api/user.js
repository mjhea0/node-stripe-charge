const express = require('express');
const router = express.Router();
const mongoose = require('mongoose-q')(require('mongoose'));

const passport = require('../../lib/auth');
const helpers = require('../../lib/helpers');
const User = require('../../models/user');


// ** users ** //

// get ALL users
router.get('/users', helpers.ensureAdminJSON,
  (req, res, next) => {
    User.findQ()
      .then(users => {
        return res.status(200)
          .json({
            status: 'success',
            data: users,
            message: 'Retrieved users.'
          });
      })
      .catch(err => {
        return next(err);
      })
      .done();
  });

// get SINGLE user
router.get('/users/:id', helpers.ensureAdminJSON,
  (req, res, next) => {
    User.findByIdQ(req.params.id)
      .then(user => {
        res.status(200)
          .json({
            status: 'success',
            data: user,
            message: 'Retrieved user.'
          });
      })
      .catch(err => {
        return next(err);
      })
      .done();
  });

// add new user
router.post('/users', helpers.ensureAdminJSON,
  (req, res, next) => {
    User.findOneQ({
      email: req.body.email
    })
      .then(existingUser => {
        if (existingUser) {
          res.status(409)
            .json({
              status: 'error',
              data: null,
              message: 'Email is already in use.'
            });
        } else {
          const user = new User(req.body);
          user.saveQ()
            .then(result => {
              res.status(200)
                .json({
                  status: 'success',
                  data: {
                    email: user.email,
                    admin: user.admin
                  },
                  message: 'Created user.'
                });
            })
            .catch(err => {
              return next(err);
            })
            .done();
        }
      })
      .catch(err => {
        return next(err);
      })
      .done();
  });

// update SINGLE user
router.put('/users/:id', helpers.ensureAdminJSON,
  (req, res, next) => {
    const id = req.params.id;
    const update = req.body;
    const options = {
      new: true,
      upsert: true
    };

    User.findByIdAndUpdateQ(id, update, options)
      .then(result => {
        res.status(200)
          .json({
            status: 'success',
            data: result,
            message: 'Updated user.'
          });
      })
      .catch(err => {
        res.send(err);
      })
      .done();
  });

// delete SINGLE user
router.delete('/users/:id', helpers.ensureAdminJSON,
  (req, res, next) => {
    User.findByIdAndRemoveQ(req.params.id)
      .then(user => {
        res.status(200)
          .json({
            status: 'success',
            data: user,
            message: 'Removed user.'
          });
      })
      .catch(err => {
        res.send(err);
      })
      .done();
  });


module.exports = router;
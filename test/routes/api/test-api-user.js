process.env.NODE_ENV = 'test';

var request = require('supertest');
var assert = require("assert");
var mongoose = require('mongoose-q')(require('mongoose'));

var app = require('../../../src/server/app');
var User = require('../../../src/server/models/user');


// *** Unauthenticated *** //

describe('user.js routes when unauthenticated', function(){

  beforeEach(function(done) {

    mongoose.connection.db.dropDatabase();

    var testUser = new User({
      'email': 'michael@herman.com',
      'password': 'herman'
    });

    testUser.saveQ()
    .then(function() {
      done();
    });

  });

  afterEach(function(done) {
    mongoose.connection.db.dropDatabase(done);
  });

  describe('GET /api/users', function() {
    it('should return an error message', function(done){
      request(app)
      .get('/api/users')
      .end(function(err, res){
        assert.equal(res.statusCode, 400);
        assert.equal(res.type, 'application/json');
        assert.equal(
          res.text,
          '{"message":"You did not provide a JSON Web Token in the authorization header."}'
        );
        done();
      });
    });
  });

  describe('GET /api/user/:id', function() {
    it('should return an error message', function(done){
      User.findQ()
      .then(function(result) {
        request(app)
        .get('/api/user/' + result[0].id)
        .end(function(err, res) {
          assert.equal(res.statusCode, 400);
          assert.equal(res.type, 'application/json');
          assert.equal(
            res.text,
            '{"message":"You did not provide a JSON Web Token in the authorization header."}'
          );
          done();
        });
      });
    });
  });

  describe('POST /api/users', function() {

    it('should create a user', function(done){
      var newUser = {
        'email': 'test@test.com',
        'password': 'test'
      };
      request(app)
      .post('/api/users')
      .send(newUser)
      .end(function(err, res){
        assert.equal(res.statusCode, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(
          res.text,
          '{"status":"success","data":{"email":"test@test.com","admin":false},"message":"Created user."}'
        );
        done();
      });
    });

    it('should return an error when duplicating emails', function(done) {
      var newUser = {
        'email': 'michael@herman.com',
        'password': 'herman'
      };
      request(app)
      .post('/api/users')
      .send(newUser)
      .end(function(err, res){
        assert.equal(res.statusCode, 409);
        assert.equal(res.type, 'application/json');
        assert.equal(
          res.text,
          '{"status":"error","data":null,"message":"Email is already in use."}'
        );
        done();
      });
    });

  });

  describe('PUT /api/user/:id', function() {
    it('should return an error', function(done) {
      User.findQ()
      .then(function(result) {
        request(app)
        .put('/api/user/' + result[0]._id)
        .send({username:'Testing Put Route'})
        .end(function(err, res) {
          assert.equal(res.statusCode, 400);
          assert.equal(res.type, 'application/json');
          assert.equal(
            res.text,
            '{"message":"You did not provide a JSON Web Token in the authorization header."}'
          );
          done();
        });
      });
    });
  });

  describe('DELETE /api/user/:id', function() {
    it('should return an error', function(done) {
      User.findQ()
      .then(function(result) {
        request(app)
        .delete('/api/user/' + result[0]._id)
        .end(function(err, res) {
          assert.equal(res.statusCode, 400);
          assert.equal(res.type, 'application/json');
          assert.equal(
            res.text,
            '{"message":"You did not provide a JSON Web Token in the authorization header."}'
          );
          done();
        });
      });
    });
  });

});
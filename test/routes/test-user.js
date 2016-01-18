process.env.NODE_ENV = 'test';

var request = require('supertest');
var assert = require("assert");
var mongoose = require('mongoose-q')(require('mongoose'));

var app = require('../../src/server/app');
var User = require('../../src/server/models/user');

// *** Unauthenticated *** //

describe('user.js routes when unauthenticated', function(){

  beforeEach(function(done) {
    mongoose.connection.db.dropDatabase();

    var testUser = new User({
      'email': 'michael@herman.com',
      'password': 'herman'
    });

    testUser.saveQ()
    .then(function(user) {
      done();
    });

  });

  afterEach(function(done) {
    mongoose.connection.db.dropDatabase(done);
  });

  describe('GET /users', function() {
    it('should return an error message', function(done){
      request(app)
      .get('/users')
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

  describe('GET /user/:id', function() {
    it('should return an error message', function(done){
      User.findQ()
      .then(function(result) {
        request(app)
        .get('/user/' + result[0].id)
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

  describe('POST /users', function() {

    it('should create a user', function(done){
      var newUser = {
        'email': 'test@test.com',
        'password': 'test'
      };
      request(app)
      .post('/users')
      .send(newUser)
      .end(function(err, res){
        assert.equal(res.statusCode, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(
          res.text,
          '{"status":"success","data":{"email":"test@test.com","admin":false},"message":"Created user"}'
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
      .post('/users')
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

  describe('PUT /user/:id', function() {
    it('should return an error', function(done) {
      User.findQ()
      .then(function(result) {
        request(app)
        .put('/user/' + result[0]._id)
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

  describe('DELETE /user/:id', function() {
    it('should return an error', function(done) {
      User.findQ()
      .then(function(result) {
        request(app)
        .delete('/user/' + result[0]._id)
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
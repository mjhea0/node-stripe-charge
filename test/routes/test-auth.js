process.env.NODE_ENV = 'test';

var request = require('supertest');
var assert = require("assert");
var mongoose = require('mongoose-q')(require('mongoose'));

var app = require('../../src/server/app');
var User = require('../../src/server/models/user');


// *** Unauthenticated *** //

describe('auth.js routes when unauthenticated', function(){

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

  describe('POST /auth/login', function() {

    it('should login a user', function(done){
      var newUser = {
        'email': 'michael@herman.com',
        'password': 'herman'
      };
      request(app)
      .post('/auth/login')
      .send(newUser)
      .end(function(err, res){
        assert.equal(res.statusCode, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(
          res.text,
          '{"status":"success","data":{"token":"'+res.body.data.token+'","email":"michael@herman.com","admin":false},"message":"Generated token."}'
        );
        done();
      });
    });

    it('should return an error when email is incorrect', function(done) {
      var newUser = {
        'email': 'incorrect@email.com',
        'password': 'herman'
      };
      request(app)
      .post('/auth/login')
      .send(newUser)
      .end(function(err, res){
        assert.equal(res.statusCode, 401);
        assert.equal(res.type, 'application/json');
        assert.equal(
          res.text,
          '{"status":"error","data":null,"message":"Incorrect email."}'
        );
        done();
      });
    });

    it('should return an error when password is incorrect', function(done) {
      var newUser = {
        'email': 'michael@herman.com',
        'password': 'incorrect'
      };
      request(app)
      .post('/auth/login')
      .send(newUser)
      .end(function(err, res){
        assert.equal(res.statusCode, 401);
        assert.equal(res.type, 'application/json');
        assert.equal(
          res.text,
          '{"status":"error","data":null,"message":"Wrong email address and/or password."}'
        );
        done();
      });
    });

  });

});
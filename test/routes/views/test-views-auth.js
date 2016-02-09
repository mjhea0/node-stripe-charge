process.env.NODE_ENV = 'test';

var request = require('supertest');
var assert = require('assert');

var app = require('../../../src/server/app');
var User = require('../../../src/server/models/user');
var helpers = require('../../helpers');


describe("auth.js Routes", function() {

  before(function(done) {
    var user = new User({
      email: 'test@test.com',
      password: 'test',
      admin: true,
    });
    user.save(function (err, results) {
      done();
    });
  });

  after(function(done) {
    User.collection.drop();
    done();
  });

  describe('GET auth/login', function(){
    it ('should return a view', function(done) {
      request(app)
        .get('/auth/login')
        .end(function (err, res) {
          assert.equal(res.statusCode, 200);
          assert.equal(res.status, 200);
          helpers.contains(res.text, '<h1>Login</h1>\n');
          done();
        });
    });
  });

  describe('POST auth/login', function(){

    it ('should login a user', function(done) {
      var user = {
        'email': 'test@test.com',
        'password': 'test'
      };
      request(app)
        .post('/auth/login')
        .send(user)
        .end(function (err, res) {
          assert.equal(res.statusCode, 302);
          assert.equal(res.header.location, '/');
          done();
        });
    });

    it ('should fail if user is not registered', function(done) {
      var user = {
        'email': 'un@registered.com',
        'password': 'test'
      };
      request(app)
        .post('/auth/login')
        .send(user)
        .end(function (err, res) {
          assert.equal(res.statusCode, 302);
          assert.equal(res.header.location, '/auth/login');
          done();
        });
    });

  });

  describe('GET auth/register', function(){
    it ('should return a view', function(done) {
      request(app)
        .get('/auth/register')
        .end(function (err, res) {
          assert.equal(res.statusCode, 200);
          assert.equal(res.status, 200);
          helpers.contains(res.text, '<h1>Register</h1>\n');
          done();
        });
    });
  });

  describe('POST auth/register', function(){

    it ('should register and login a user', function(done) {
      var newUser = {
        'email': 'michael@herman.com',
        'password': 'herman'
      };
      request(app)
        .post('/auth/register')
        .send(newUser)
        .end(function (err, res) {
          assert.equal(res.statusCode, 302);
          assert.equal(res.header.location, '/');
          done();
        });
    });

    it ('should fail if email is already is use', function(done) {
      var newUser = {
        'email': 'test@test.com',
        'password': 'test'
      };
      request(app)
        .post('/auth/register')
        .send(newUser)
        .end(function (err, res) {
          assert.equal(res.statusCode, 302);
          assert.equal(res.header.location, '/auth/register');
          done();
        });
    });

  });

});
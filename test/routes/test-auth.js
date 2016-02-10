process.env.NODE_ENV = 'test';

var request = require('supertest');
var should = require('should');
var assert = require('assert');
var mongoose = require('mongoose');

var app = require('../../src/server/app');
var User = require('../../src/server/models/user.js');


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

  it('finds a user by email', function(done) {
    User.findOne({email: 'test@test.com'}, function(err, user) {
      assert.equal(user.email, 'test@test.com');
      assert.equal(user.admin, true);
      done();
    });
  });

  it('finds all users', function(done) {
    User.find({}, function(err, user) {
      assert.equal(user.length, 1);
      done();
    });
  });

  describe('GET auth/login', function(){
    it ('should return a view', function(done) {
      request(app)
        .get('/auth/login')
        .end(function (err, res) {
          assert.equal(res.statusCode, 200);
          res.text.should.containEql('<h1>Login</h1>\n');
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
          res.text.should.containEql('<h1>Register</h1>\n');
          done();
        });
    });
  });

  describe('GET auth/logout', function(){
    it ('should redirect if user is not logged in', function(done) {
      request(app)
        .get('/auth/logout')
        .end(function (err, res) {
          assert.equal(res.statusCode, 302);
          assert.equal(res.status, 302);
          assert.equal(res.header.location, '/auth/login');
          done();
        });
    });
  });

  describe('GET auth/admin', function(){
    it ('should redirect if user is not logged in', function(done) {
      request(app)
        .get('/auth/admin')
        .end(function (err, res) {
          assert.equal(res.statusCode, 302);
          assert.equal(res.status, 302);
          assert.equal(res.header.location, '/auth/login');
          done();
        });
    });

    // it ('should return a view if user is logged in', function(done) {
    //   request(app)
    //     .post('/auth/login')
    //     .send('email=test@test.com')
    //     .send('password=test')
    //     .end(function (err, res) {
    //       console.log(res);
    //       should.not.exist(err);
    //       assert.equal(res.statusCode, 302);
    //       assert.equal(res.header.location, '/auth/admin');
    //       done();
    //     });
    // });

  });

});
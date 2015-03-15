process.env.NODE_ENV = 'test';
var app = require('../server/app');
var request = require('supertest');
var should = require("should");
var mongoose = require('mongoose');
var User = require("../server/models/user.js");


describe("user.js Routes", function() {

  before(function(done) {
    var user = new User({
      username: 'test@test.com',
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

  it('finds a user by username', function(done) {
    User.findOne({username: 'test@test.com'}, function(err, user) {
      user.username.should.eql('test@test.com');
      user.admin.should.eql(true);
      done();
    });
  });

  it('finds all users', function(done) {
    User.find({}, function(err, user) {
      user.length.should.eql(1);
      done();
    });
  });

  describe('GET /logout', function(){
    it ('should redirect if user is not logged in', function(done) {
      request(app)
        .get('/auth/logout')
        .expect(302)
        .end(function (err, res) {
          res.header.location.should.eql('/auth/login');
        });
        done();
    });
  });

  describe('GET /admin', function(){
    it ('should redirect if user is not logged in', function(done) {
      request(app)
        .get('/auth/admin')
        .expect(302)
        .end(function (err, res) {
          res.header.location.should.eql('/auth/login');
        });
        done();
    });

    // it ('should return a view if user is logged in', function(done) {
    //   request(app)
    //     .post('/auth/login')
    //     .send({username: 'test@test.com', password: 'test' })
    //     .expect(302)
    //     .end(function (err, res) {
    //       res.header.location.should.eql('/');
    //     });
    //     done();
    // });

  });

});
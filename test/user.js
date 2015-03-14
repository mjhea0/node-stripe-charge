process.env.NODE_ENV = 'test';
var app = require('../server/app');
var request = require('supertest');
var should = require("should");
var mongoose = require('mongoose');
var User = require("../server/models/user.js");


describe("users.js Routes", function() {

  before(function(done) {
    var user = new User({
      username: 'test@test.com',
      password: 'test',
      admin: true,
    });

    user.save();
    done();

  });

  after(function(done) {
    User.remove({});
    mongoose.disconnect();
    done();
  });

  it('finds a user by username', function(done) {
    User.findOne({username: 'test@test.com'}, function(err, user) {
      user.username.should.eql('test@test.com');
      user.admin.should.eql(true);
      done();
    });
  });

  describe('GET /logout', function(){
    it ('should redirect if user is not logged in', function(done) {
      request(app)
        .get('/logout')
        .expect(200)
        .end(function (err, res) {
          res.header.location.should.eql('/login');
        });
        done();
    });
  });

  describe('GET /admin', function(){
    it ('should redirect if user is not logged in', function(done) {
      request(app)
        .get('/admin')
        .expect(200)
        .end(function (err, res) {
          res.header.location.should.eql('/login');
        });
        done();
    });

    it ('should return a view if user is logged in', function(done) {
      request(app)
        .post('/login')
        .send({username: 'test@test.com', password: 'test' })
        .expect(200)
        .end(function (err, res) {
          res.header.location.should.eql('/admin');
        });
        done();
    });

  });

});
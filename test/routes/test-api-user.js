process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose-q')(require('mongoose'));
var passportStub = require('passport-stub');

var app = require('../../src/server/app');
var User = require('../../src/server/models/user');
var should = chai.should();

chai.use(chaiHttp);


describe('User API Routes', function() {

  before(function(done) {

    mongoose.connection.db.dropDatabase();

    var newUser = new User({
      email: 'test@test.com',
      password: 'test',
      admin: true,
      products: [{token:'12345'}]
    });

    newUser.saveQ()
    .then(function() {
      passportStub.login(newUser);
      done();
    });

  });

  after(function(done) {
    passportStub.logout();
    mongoose.connection.db.dropDatabase();
    done();
  });

  describe('GET api/v1/users', function(){
    it ('should return all users', function(done) {
      chai.request(app)
      .get('/api/v1/users')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;  // jshint ignore:line
        res.body.status.should.equal('success');
        res.body.data.length.should.equal(1);
        res.body.data[0].email.should.equal('test@test.com');
        res.body.data[0].admin.should.equal(true);
        res.body.message.should.equal('Retrieved users.');
        res.body.should.be.instanceof(Object);
        res.body.data.should.be.instanceof(Array);
        done();
      });
    });
  });

  describe('POST api/v1/users', function(){
    it ('should add a user', function(done) {
      var user = {
        email: 'your@name.com',
        password: 'name123456'
      };
      chai.request(app)
      .post('/api/v1/users')
      .send(user)
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;  // jshint ignore:line
        res.body.status.should.equal('success');
        res.body.data.email.should.equal('your@name.com');
        res.body.data.admin.should.equal(false);
        res.body.message.should.equal('Created user.');
        res.body.should.be.instanceof(Object);
        done();
      });
    });
  });

  // describe('GET api/v1/users/:id', function(){
  //   it ('should return a single user', function(done) {
  //     User.findOneQ()
  //     .then(function(result) {
  //       var userID = result._id;
  //       chai.request(app)
  //       .get('/api/v1/users/' + userID)
  //       .end(function (err, res) {
  //         res.should.have.status(200);
  //         res.should.be.json;  // jshint ignore:line
  //         res.body.status.should.equal('success');
  //         res.body.data.email.should.equal('test@test.com');
  //         res.body.data.admin.should.equal(true);
  //         res.body.message.should.equal('Retrieved user.');
  //         res.body.should.be.instanceof(Object);
  //         done();
  //       });
  //     });
  //   });
  // });

  describe('PUT api/v1/users/:id', function(){
    it ('should update a single user', function(done) {
      User.findQ()
      .then(function(result) {
        chai.request(app)
        .put('/api/v1/users/' + result[0]._id)
        .send({email:'testing@put.route', admin:false})
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;  // jshint ignore:line
          res.body.status.should.equal('success');
          res.body.data.email.should.equal('testing@put.route');
          res.body.data.admin.should.equal(false);
          res.body.message.should.equal('Updated user.');
          res.body.should.be.instanceof(Object);
          done();
        });
      });
    });
  });

  describe('DELETE api/v1/users/:id', function() {
    it ('should delete a single user', function(done) {
      User.findQ()
      .then(function(result) {
        chai.request(app)
        .delete('/api/v1/users/' + result[0]._id)
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;  // jshint ignore:line
          res.body.status.should.equal('success');
          res.body.data.email.should.equal('test@test.com');
          res.body.data.admin.should.equal(true);
          res.body.message.should.equal('Removed user.');
          res.body.should.be.instanceof(Object);
          done();
        });
      });
    });
  });

});
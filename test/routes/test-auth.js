process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose-q')(require('mongoose'));
var passportStub = require('passport-stub');

var app = require('../../src/server/app');
var User = require('../../src/server/models/user.js');
var should = chai.should();

chai.use(chaiHttp);


describe("auth.js Routes", function() {

  beforeEach(function(done) {

    mongoose.connection.db.dropDatabase();

    var newUser = new User({
      email: 'test@test.com',
      password: 'test',
      admin: true,
      products: [{token:'12345'}]
    });

    newUser.saveQ()
    .then(function() {
      passportStub.install(app);
      passportStub.login(newUser);
      done();
    });

  });

  afterEach(function(done) {
    passportStub.logout();
    mongoose.connection.db.dropDatabase();
    done();
  });

  it('finds a user by email', function(done) {
    User.findOne({email: 'test@test.com'}, function(err, user) {
      user.email.should.equal('test@test.com');
      user.admin.should.equal(true);
      done();
    });
  });

  it('finds all users', function(done) {
    User.find({}, function(err, user) {
      user.length.should.equal(1);
      done();
    });
  });

  describe('GET auth/login', function() {

    it ('should return the login view if user is NOT logged in', function(done) {
      passportStub.logout();
      chai.request(app)
      .get('/auth/login')
      .end(function (err, res) {
        res.should.have.status(200);
        res.text.should.contain('<h1>Login</h1>\n');
        done();
      });
    });

    // it ('should redirect to "/" if user is logged in', function(done) {
    //   chai.request(app)
    //   .get('/auth/login')
    //   .end(function (err, res) {
    //     res.should.have.status(200);
    //     res.redirects[0].should.contain('/');
    //     res.should.be.html;  // jshint ignore:line
    //     res.text.should.contain('<h1>Node + Stripe + Express</h1>');
    //     done();
    //   });
    // });

  });

  describe('GET auth/register', function() {
    it ('should return the Register view', function(done) {
      chai.request(app)
      .get('/auth/register')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.html;  // jshint ignore:line
        res.text.should.contain('<h1>Register</h1>\n');
        done();
      });
    });
  });

  describe('POST auth/register', function() {
    it ('should register a user', function(done) {
      passportStub.logout();
      var newTestUser = {
        email: 'michael@test.com',
        password: 'testing',
        admin: false,
        products: [{token:'123456789'}]
      };
      chai.request(app)
      .post('/auth/register')
      .send(newTestUser)
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.html;  // jshint ignore:line
        res.text.should.contain('<h1>Node + Stripe + Express</h1>');
        User.findOne({email: 'michael@test.com'}, function(err, user) {
          user.email.should.equal('michael@test.com');
          user.admin.should.equal(false);
          done();
        });
      });
    });
  });

  describe('GET auth/logout', function() {

    // it ('should redirect to "/" if user is logged in', function(done) {
    //   chai.request(app)
    //   .get('/auth/logout')
    //   .end(function (err, res) {
    //     res.should.have.status(200);
    //     res.redirects[0].should.contain('/');
    //     res.should.be.html;  // jshint ignore:line
    //     res.text.should.contain('<h1>Node + Stripe + Express</h1>');
    //     done();
    //   });
    // });

    it ('should redirect to "/auth/login" if user is NOT logged in', function(done) {
      passportStub.logout();
      chai.request(app)
      .get('/auth/logout')
      .end(function (err, res) {
        res.should.have.status(200);
        res.redirects[0].should.contain('/auth/login');
        res.should.be.html;  // jshint ignore:line
        res.text.should.contain('<h1>Login</h1>\n');
        done();
      });
    });

  });

  describe('GET auth/admin', function() {

    it ('should redirect if user is not an admin', function(done) {
      passportStub.logout();
      chai.request(app)
      .get('/auth/admin')
      .end(function (err, res) {
        res.should.have.status(200);
        res.redirects[0].should.contain('/auth/login');
        res.text.should.contain('<h1>Login</h1>\n');
        done();
      });
    });

  });

});
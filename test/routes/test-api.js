process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose-q')(require('mongoose'));
var passportStub = require('passport-stub');

var app = require('../../src/server/app');
var Product = require('../../src/server/models/product.js');
var User = require('../../src/server/models/user.js');
var should = chai.should();

chai.use(chaiHttp);


describe('api.js Routes', function() {

  beforeEach(function(done) {

    mongoose.connection.db.dropDatabase();

    var newProduct = new Product({
      name: 'Coconut Water',
      amount: 5,
      currency: 'USD',
      forSale: true
    });

    var newUser = new User({
      email: 'test@test.com',
      password: 'test',
      admin: true,
      products: [{token:'12345'}]
    });

    newUser.saveQ()
    .then(function() {
      newProduct.saveQ()
      .then(function() {
        passportStub.install(app);
        passportStub.login(newUser);
        done();
      });
    });

  });

  afterEach(function(done) {
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

  describe('GET api/v1/users/:id', function(){
    it ('should return a single user', function(done) {
      User.findOneQ()
      .then(function(result) {
        var userID = result._id;
        chai.request(app)
        .get('/api/v1/users/' + userID)
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;  // jshint ignore:line
          res.body.status.should.equal('success');
          res.body.data.email.should.equal('test@test.com');
          res.body.data.admin.should.equal(true);
          res.body.message.should.equal('Retrieved user.');
          res.body.should.be.instanceof(Object);
          done();
        });
      });
    });
  });

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

  // describe('DELETE api/v1/users/:id', function() {
  //   it ('should delete a single user', function(done) {
  //     User.findQ()
  //     .then(function(result) {
  //       chai.request(app)
  //       .delete('/api/v1/users/' + result[0]._id)
  //       .end(function(err, res) {
  //         res.should.have.status(200);
  //         res.should.be.json;  // jshint ignore:line
  //         res.body.status.should.equal('success');
  //         res.body.data.email.should.equal('test@test.com');
  //         res.body.data.admin.should.equal(true);
  //         res.body.message.should.equal('Removed user.');
  //         res.body.should.be.instanceof(Object);
  //         done();
  //       });
  //     });
  //   });
  // });

  describe('GET api/v1/products', function(){
    it ('should return all products', function(done) {
      chai.request(app)
      .get('/api/v1/products')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;  // jshint ignore:line
        res.body.status.should.equal('success');
        res.body.data.length.should.equal(1);
        res.body.data[0].name.should.equal('Coconut Water');
        res.body.data[0].amount.should.equal(5);
        res.body.message.should.equal('Retrieved products.');
        res.body.should.be.instanceof(Object);
        res.body.data.should.be.instanceof(Array);
        done();
      });
    });
  });

  describe('POST api/v1/products', function(){
    it ('should add a product', function(done) {
      var product = {name: 'Socks', amount: 22.99};
      chai.request(app)
      .post('/api/v1/products')
      .send(product)
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;  // jshint ignore:line
        res.body.status.should.equal('success');
        res.body.data.name.should.equal('Socks');
        res.body.data.amount.should.equal(22.99);
        res.body.message.should.equal('Created product.');
        res.body.should.be.instanceof(Object);
        done();
      });
    });
  });

  describe('GET api/v1/products/:id', function(){
    it ('should return a single product', function(done) {
      Product.findOneQ()
      .then(function(result) {
        var productID = result._id;
        chai.request(app)
        .get('/api/v1/products/' + productID)
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;  // jshint ignore:line
          res.body.status.should.equal('success');
          res.body.data.name.should.equal('Coconut Water');
          res.body.data.amount.should.equal(5);
          res.body.message.should.equal('Retrieved product.');
          res.body.should.be.instanceof(Object);
          done();
        });
      });
    });
  });

  describe('PUT api/v1/products/:id', function(){
    it ('should update a single product', function(done) {
      Product.findQ()
      .then(function(result) {
        chai.request(app)
        .put('/api/v1/products/' + result[0]._id)
        .send({name:'Soda Pop', amount:3})
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;  // jshint ignore:line
          res.body.status.should.equal('success');
          res.body.data.name.should.equal('Soda Pop');
          res.body.data.amount.should.equal(3);
          res.body.message.should.equal('Updated product.');
          res.body.should.be.instanceof(Object);
          done();
        });
      });
    });
  });

  describe('DELETE api/v1/products/:id', function() {
    it ('should delete a single product', function(done) {
      Product.findQ()
      .then(function(result) {
        chai.request(app)
        .delete('/api/v1/products/' + result[0]._id)
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;  // jshint ignore:line
          res.body.status.should.equal('success');
          res.body.data.name.should.equal('Coconut Water');
          res.body.data.amount.should.equal(5);
          res.body.message.should.equal('Removed product.');
          res.body.should.be.instanceof(Object);
          done();
        });
      });
    });
  });

});
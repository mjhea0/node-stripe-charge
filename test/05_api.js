process.env.NODE_ENV = 'test';
var app = require('../server/app'),
    request = require('supertest'),
    should = require("should"),
    assert = require("assert"),
    mongoose = require('mongoose'),
    Product = require("../server/models/product.js"),
    User = require("../server/models/user.js");


describe("api.js Routes", function() {

  before(function(done) {

    var product = new Product({
      name: "Coconut Water",
      amount: 5,
      currency: 'USD',
      forSale: true
    });

    var user = new User({
      products: [{token: "12345"}]
    });

    product.save();
    user.save();

    done();

  });

  after(function(done) {
    Product.collection.drop();
    User.collection.drop();
    done();
  });

  // describe('GET api/v1/products', function(){
  //   it ('should return all products', function(done) {
  //     request(app)
  //       .get('/api/v1/products')
  //       .end(function (err, res) {
  //         assert.equal(res.statusCode, 200);
  //         assert.equal(res.status, 200);
  //         assert.equal(res.type, 'application/json');
  //         assert.equal(res.body.length, 1);
  //         assert.equal(res.body[0].name, 'Coconut Water');
  //         (res.body).should.be.instanceof(Object);
  //         (res.body).should.be.instanceof(Array);
  //         done();
  //       });
  //   });
  // });

  describe('POST api/v1/products', function(){
    it ('should add a product', function(done) {
      var product = {name: 'Socks', amount: 22.99};
      request(app)
        .post('/api/v1/products')
        .send(product)
        .end(function (err, res) {
          assert.equal(res.statusCode, 200);
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.name, 'Socks');
          assert.equal(res.body.amount, '22.99');
          (res.body).should.be.instanceof(Object);
          done();
        });
    });
  });

  describe('GET api/v1/product/:id', function(){
    it ('should return a single product', function(done) {
      Product.findOne({}, function (err, results) {
        var productID = results._id;
        request(app)
        .get('/api/v1/product/'+productID)
        .end(function (err, res) {
          assert.equal(res.statusCode, 200);
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.name, 'Coconut Water');
          (res.body).should.be.instanceof(Object);
          done();
        });
      });
    });
  });

  describe('GET api/v1/users', function(){
    it ('should return all users', function(done) {
      request(app)
        .get('/api/v1/users')
        .end(function (err, res) {
          assert.equal(res.statusCode, 200);
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.length, 1);
          assert.equal(res.body[0].products[0].token, '12345');
          (res.body).should.be.instanceof(Object);
          (res.body).should.be.instanceof(Array);
          done();
        });
    });
  });

  describe('GET api/v1/user/:id', function(){
    it ('should return a single user', function(done) {
      User.findOne({}, function (err, results) {
        var userID = results._id;
        request(app)
        .get('/api/v1/user/'+userID)
        .end(function (err, res) {
          assert.equal(res.statusCode, 200);
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.products[0].token, '12345');
          (res.body).should.be.instanceof(Object);
          done();
        });
      });
    });
  });

});
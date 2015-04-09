process.env.NODE_ENV = 'test';
var app = require('../server/app'),
    request = require('supertest'),
    assert = require("assert"),
    mongoose = require('mongoose'),
    Product = require("../server/models/product.js");


describe("api.js Routes", function() {

  before(function(done) {

    var product = new Product({
      name: "Coconut Water",
      amount: 5,
      currency: 'USD',
      forSale: true
    });

    product.save(function (err, results) {
      done();
    });

  });

  after(function(done) {
    Product.collection.drop();
    done();
  });

  describe('GET api/v1/products', function(){
    it ('should return all products', function(done) {
      request(app)
        .get('/api/v1/products')
        .end(function (err, res) {
          assert.equal(res.statusCode, 200);
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.length, 1);
          assert.equal(res.body[0].name, 'Coconut Water');
          (res.body).should.be.instanceof(Object);
          (res.body).should.be.instanceof(Array);
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

});
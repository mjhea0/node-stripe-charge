process.env.NODE_ENV = 'test';
var app = require('../server/app');
var request = require('supertest');
var should = require("should");
var mongoose = require('mongoose');
var Product = require("../server/models/product.js");


describe("product.js Routes", function() {

  before(function(done) {

    var product = new Product({
      name: "Concunut Water",
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

  describe('GET api/products', function(){
    it ('should return all products', function(done) {
      request(app)
        .get('/api/products')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          res.body.should.be.instanceof(Array);
          res.body.length.should.eql(1);
          res.body[0].name.should.eql('Concunut Water');
        });
        done();
    });
  });

});
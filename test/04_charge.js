process.env.NODE_ENV = 'test';
var app = require('../server/app'),
    request = require('supertest'),
    assert = require("assert"),
    Product = require("../server/models/product.js");


describe('charge.js Routes', function(){

  before(function(done) {

    var product = new Product({
      name: "Coconut Water",
      amount: 5,
      currency: 'USD',
      forSale: true
    });

    product.save();
    done();

  });

  after(function(done) {
    Product.collection.drop();
    done();
  });

  describe('GET /stripe', function(){
    it('should return a view', function(done){
      request(app)
      .get('/stripe')
      .end(function(err, res){
        assert.equal(res.statusCode, 200);
        assert.equal(res.status, 200);
        assert.equal(res.type, 'text/html');
        assert.equal(res.text, 'Scram!');
        done();
      });
    });
  });

  // describe('GET /products', function(){
  //   it('should return a view', function(done){
  //     request(app)
  //     .get('/products')
  //     .end(function(err, res){
  //       assert.equal(res.statusCode, 200);
  //       assert.equal(res.status, 200);
  //       assert.equal(res.type, 'text/html');
  //       res.text.should.containEql('Coconut Water');
  //       done();
  //     });
  //   });
  // });

  describe('GET /product/:id', function(){
    it('should return a view', function(done){
      Product.findOne({}, function (err, results) {
        var productID = results._id;
        var productPrice = results.amount;
        request(app)
        .get('/product/'+productID)
        .end(function(err, res){
          assert.equal(res.statusCode, 200);
          assert.equal(res.status, 200);
          assert.equal(res.type, 'text/html');
          res.text.should.containEql('Coconut Water');
          res.text.should.containEql(productPrice);
          done();
      });
      });
    });
  });

  describe('GET /charge', function(){
    it('should redirect if user is not logged in', function(done){
      Product.findOne({}, function (err, results) {
        var productID = results._id;
        request(app)
        .get('/charge/'+productID)
        .end(function(err, res){
          assert.equal(res.statusCode, 302);
          assert.equal(res.status, 302);
          assert.equal(res.type, 'text/plain');
          assert.equal(res.header.location, '/auth/login');
          done();
        });
      });
    });
  });

});



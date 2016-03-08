process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose-q')(require('mongoose'));
var passportStub = require('passport-stub');

var app = require('../../src/server/app');
var Product = require('../../src/server/models/product.js');
var should = chai.should();

chai.use(chaiHttp);


describe('charge.js Routes', function(){

  beforeEach(function(done) {

    mongoose.connection.db.dropDatabase();

    var product = new Product({
      name: 'Coconut Water',
      amount: 5,
      currency: 'USD',
      forSale: true
    });

    product.saveQ()
    .then(function(){
      done();
    });

  });

  after(function(done) {
    mongoose.connection.db.dropDatabase();
    done();
  });

  describe('GET /stripe', function(){
    it('should return a view', function(done){
      chai.request(app)
      .get('/stripe')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;  // jshint ignore:line
        res.text.should.contain.string('Scram!');
        done();
      });
    });
  });

  // describe('GET /products', function(){
  //   it('should return a view', function(done){
  //     chai.request(app)
  //     .get('/products')
  //     .end(function(err, res){
  //       res.should.have.status(200);
  //       res.should.be.html;  // jshint ignore:line
  //       res.text.should.contain.string('Coconut Water');
  //       done();
  //     });
  //   });
  // });

  // describe('GET /product/:id', function(){
  //   it('should return a view', function(done){
  //     Product.findOne({}, function (err, results) {
  //       var productID = results._id;
  //       var productPrice = results.amount;
  //       chai.request(app)
  //       .get('/product/'+productID)
  //       .end(function(err, res){
  //         res.should.have.status(200);
  //         res.should.be.html;  // jshint ignore:line
  //         res.text.should.contain.string('Coconut Water');
  //         res.text.should.contain.string(productPrice);
  //         done();
  //       });
  //     });
  //   });
  // });

  // describe('GET /charge', function(){
  //   it('should redirect if user is not logged in', function(done){
  //     Product.findOne({}, function (err, results) {
  //       var productID = results._id;
  //       chai.request(app)
  //       .get('/charge/' + productID)
  //       .end(function(err, res){
  //         res.should.have.status(200);
  //         res.redirects[0].should.contain('/auth/login');
  //         res.text.should.contain('<h1>Login</h1>\n');
  //         done();
  //       });
  //     });
  //   });
  // });

});



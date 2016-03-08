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


describe('Product API Routes', function() {

  before(function(done) {

    mongoose.connection.db.dropDatabase();

    var newUser = new User({
      email: 'test@test.com',
      password: 'test',
      admin: true,
      products: [{token:'12345'}]
    });

    var newProduct = new Product({
      name: 'Coconut Water',
      amount: 5,
      currency: 'USD',
      forSale: true
    });

    newProduct.saveQ()
    .then(function() {
      newUser.saveQ()
      .then(function() {
        passportStub.install(app);
        passportStub.login(newUser);
        done();
      });
    });

  });

  after(function(done) {
    passportStub.logout();
    mongoose.connection.db.dropDatabase();
    done();
  });

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
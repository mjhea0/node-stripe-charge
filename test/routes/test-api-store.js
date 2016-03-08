process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose-q')(require('mongoose'));
var passportStub = require('passport-stub');

var app = require('../../src/server/app');
var Store = require('../../src/server/models/store.js');
var User = require('../../src/server/models/user.js');
var should = chai.should();

chai.use(chaiHttp);


describe('Store API Routes', function() {

  beforeEach(function(done) {

    mongoose.connection.db.dropDatabase();

    var newUser = new User({
      email: 'test@test.com',
      password: 'test',
      admin: true,
      products: [{token:'12345'}]
    });

    var newStore = new Store({
      name: 'Toys',
      description: 'Just a toy store'
    });

    newStore.saveQ()
    .then(function() {
      newUser.saveQ()
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

  describe('GET api/v1/stores', function(){
    it ('should return all stores', function(done) {
      chai.request(app)
      .get('/api/v1/stores')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;  // jshint ignore:line
        res.body.status.should.equal('success');
        res.body.data.length.should.equal(1);
        res.body.data[0].name.should.equal('Toys');
        res.body.data[0].description.should.equal('Just a toy store');
        res.body.message.should.equal('Retrieved stores.');
        res.body.should.be.instanceof(Object);
        res.body.data.should.be.instanceof(Array);
        done();
      });
    });
  });

  describe('POST api/v1/stores', function(){
    it ('should add a store', function(done) {
      var store = {name: 'Socks', description: 'Just a sock store'};
      chai.request(app)
      .post('/api/v1/stores')
      .send(store)
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;  // jshint ignore:line
        res.body.status.should.equal('success');
        res.body.data.name.should.equal('Socks');
        res.body.data.description.should.equal('Just a sock store');
        res.body.message.should.equal('Created store.');
        res.body.should.be.instanceof(Object);
        done();
      });
    });
  });

  describe('GET api/v1/stores/:id', function(){
    it ('should return a single store', function(done) {
      Store.findOneQ()
      .then(function(result) {
        var storeID = result._id;
        chai.request(app)
        .get('/api/v1/stores/' + storeID)
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;  // jshint ignore:line
          res.body.status.should.equal('success');
          res.body.data.name.should.equal('Toys');
          res.body.data.description.should.equal('Just a toy store');
          res.body.message.should.equal('Retrieved store.');
          res.body.should.be.instanceof(Object);
          done();
        });
      });
    });
  });

  describe('PUT api/v1/stores/:id', function(){
    it ('should update a single store', function(done) {
      Store.findQ()
      .then(function(result) {
        chai.request(app)
        .put('/api/v1/stores/' + result[0]._id)
        .send({name:'Sodas', description:'Just a soda store'})
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;  // jshint ignore:line
          res.body.status.should.equal('success');
          res.body.data.name.should.equal('Sodas');
          res.body.data.description.should.equal('Just a soda store');
          res.body.message.should.equal('Updated store.');
          res.body.should.be.instanceof(Object);
          done();
        });
      });
    });
  });

  describe('DELETE api/v1/stores/:id', function() {
    it ('should delete a single store', function(done) {
      Store.findQ()
      .then(function(result) {
        chai.request(app)
        .delete('/api/v1/stores/' + result[0]._id)
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;  // jshint ignore:line
          res.body.status.should.equal('success');
          res.body.data.name.should.equal('Toys');
          res.body.data.description.should.equal('Just a toy store');
          res.body.message.should.equal('Removed store.');
          res.body.should.be.instanceof(Object);
          done();
        });
      });
    });
  });

});
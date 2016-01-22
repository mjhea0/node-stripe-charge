process.env.NODE_ENV = 'test';

var request = require('supertest');
var assert = require("assert");
var mongoose = require('mongoose-q')(require('mongoose'));

var app = require('../../src/server/app');
var Item = require('../../src/server/models/item');


// *** Unauthenticated *** //

describe('item.js routes when unauthenticated', function(){

  beforeEach(function(done) {

    mongoose.connection.db.dropDatabase();

    var testItem = new Item({
      'name': 'Hammer',
      'description': 'You can hit nails with it.',
      'cost': 22.99
    });

    testItem.saveQ()
    .then(function() {
      done();
    });

  });

  afterEach(function(done) {
    mongoose.connection.db.dropDatabase(done);
  });

  describe('GET /items', function() {
    it('should return all items', function(done){
      request(app)
      .get('/items')
      .end(function(err, res){
        assert.equal(res.statusCode, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.status, 'success');
        assert.equal(res.body.data[0].name, 'Hammer');
        assert.equal(
          res.body.data[0].description,
          'You can hit nails with it.'
        );
        assert.equal(res.body.data[0].cost, 22.99);
        assert.equal(res.body.message, 'Retrieved items.');
        done();
      });
    });
  });

  describe('GET /item/:id', function() {
    it('should return a single item', function(done){
      Item.findQ()
      .then(function(result) {
        request(app)
        .get('/item/' + result[0].id)
        .end(function(err, res) {
          assert.equal(res.statusCode, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.status, 'success');
          assert.equal(res.body.data.name, 'Hammer');
          assert.equal(
            res.body.data.description,
            'You can hit nails with it.'
          );
          assert.equal(res.body.data.cost, 22.99);
          assert.equal(res.body.message, 'Retrieved item.');
          done();
        });
      });
    });
  });

  describe('POST /items', function() {
    it('should return an error message', function(done){
      var newItem = new Item({
        'name': 'Saw',
        'description': 'You can cut things.',
        'cost': 18.50
      });
      request(app)
      .post('/items')
      .send(newItem)
      .end(function(err, res){
        assert.equal(res.statusCode, 400);
        assert.equal(res.type, 'application/json');
        assert.equal(
          res.text,
          '{"message":"You did not provide a JSON Web Token in the authorization header."}'
        );
        done();
      });
    });
  });

  describe('PUT /item/:id', function() {
    it('should return an error', function(done) {
      Item.findQ()
      .then(function(result) {
        request(app)
        .put('/user/' + result[0]._id)
        .send({name:'Testing Put Route'})
        .end(function(err, res) {
          assert.equal(res.statusCode, 400);
          assert.equal(res.type, 'application/json');
          assert.equal(
            res.text,
            '{"message":"You did not provide a JSON Web Token in the authorization header."}'
          );
          done();
        });
      });
    });
  });

  describe('DELETE /item/:id', function() {
    it('should return an error', function(done) {
      Item.findQ()
      .then(function(result) {
        request(app)
        .delete('/user/' + result[0]._id)
        .end(function(err, res) {
          assert.equal(res.statusCode, 400);
          assert.equal(res.type, 'application/json');
          assert.equal(
            res.text,
            '{"message":"You did not provide a JSON Web Token in the authorization header."}'
          );
          done();
        });
      });
    });
  });

});
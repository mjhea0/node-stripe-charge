process.env.NODE_ENV = 'test';

var request = require('supertest');
var assert = require("assert");
var mongoose = require('mongoose-q')(require('mongoose'));

var app = require('../../src/server/app');
var Plan = require('../../src/server/models/plan');


// *** Unauthenticated *** //

describe('plan.js routes when unauthenticated', function(){

  beforeEach(function(done) {

    mongoose.connection.db.dropDatabase();

    var testPlan = new Plan({
      'name': 'Silver',
      'description': 'This is the silver subscription plan.',
      'cost': 99.99
    });

    testPlan.saveQ()
    .then(function() {
      done();
    });

  });

  afterEach(function(done) {
    mongoose.connection.db.dropDatabase(done);
  });

  describe('GET /plans', function() {
    it('should return all plans', function(done){
      request(app)
      .get('/plans')
      .end(function(err, res){
        assert.equal(res.statusCode, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.status, 'success');
        assert.equal(res.body.data[0].name, 'Silver');
        assert.equal(
          res.body.data[0].description,
          'This is the silver subscription plan.'
        );
        assert.equal(res.body.data[0].cost, 99.99);
        assert.equal(res.body.message, 'Retrieved plans.');
        done();
      });
    });
  });

  describe('GET /plan/:id', function() {
    it('should return a single plan', function(done){
      Plan.findQ()
      .then(function(result) {
        request(app)
        .get('/plan/' + result[0].id)
        .end(function(err, res) {
          assert.equal(res.statusCode, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.status, 'success');
          assert.equal(res.body.data.name, 'Silver');
          assert.equal(
            res.body.data.description,
            'This is the silver subscription plan.'
          );
          assert.equal(res.body.data.cost, 99.99);
          assert.equal(res.body.message, 'Retrieved plan.');
          done();
        });
      });
    });
  });

  describe('POST /plans', function() {
    it('should return an error message', function(done){
      var newPlan = new Plan({
        'name': 'Saw',
        'description': 'You can cut things.',
        'cost': 18.50
      });
      request(app)
      .post('/plans')
      .send(newPlan)
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

  describe('PUT /plan/:id', function() {
    it('should return an error', function(done) {
      Plan.findQ()
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

  describe('DELETE /plan/:id', function() {
    it('should return an error', function(done) {
      Plan.findQ()
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
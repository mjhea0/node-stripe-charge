process.env.NODE_ENV = 'test';

var request = require('supertest');
var assert = require('assert');

var app = require('../../src/server/app');


describe('index.js Routes', function(){

  describe('GET /', function(){
    it('should return a view', function(done){
      request(app)
      .get('/')
      .end(function(err, res){
        assert.equal(res.statusCode, 200);
        assert.equal(res.type, 'text/html');
        res.text.should.containEql('<h1>Node + Stripe + Express</h1>');
        done();
      });
    });
  });

  describe('GET /ping', function(){
    it('should return a view', function(done){
      request(app)
      .get('/ping')
      .end(function(err, res){
        assert.equal(res.statusCode, 200);
        assert.equal(res.type, 'text/html');
        assert.equal(res.text, 'pong!');
        done();
      });
    });
  });

});



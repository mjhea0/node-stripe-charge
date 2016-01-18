process.env.NODE_ENV = 'test';

var request = require('supertest');
var assert = require("assert");

var app = require('../../src/server/app');


describe('index.js Routes', function(){

  describe('GET /', function(){
    it('should return a success message', function(done){
      request(app)
      .get('/')
      .end(function(err, res){
        assert.equal(res.statusCode, 200);
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(
          res.text,
          '{"status":"success","data":null,"message":"Welcome to the API!"}'
        );
        done();
      });
    });
  });

  describe('GET /ping', function(){
    it('should return a success message', function(done){
      request(app)
      .get('/ping')
      .end(function(err, res){
        assert.equal(res.statusCode, 200);
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(
          res.text,
          '{"status":"success","data":null,"message":"pong!"}'
        );
        done();
      });
    });
  });

});



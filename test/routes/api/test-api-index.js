process.env.NODE_ENV = 'test';

var request = require('supertest');
var assert = require("assert");

var app = require('../../../src/server/app');
var helpers = require('../../helpers');


describe('index.js Routes', function(){

  describe('GET /api/', function(){
    it('should return a success message', function(done){
      request(app)
      .get('/api/')
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

  describe('GET /api/ping', function(){
    it('should return a success message', function(done){
      request(app)
      .get('/api/ping')
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



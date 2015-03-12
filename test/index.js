process.env.NODE_ENV = 'test';
var app = require('../server/app');
var request = require('supertest');
var should = require('should');

describe('index.js Routes', function(){

  describe('GET /', function(){
    it('should return a view', function(done){
      request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .end(function(err, res){
        res.text.should.include('Node + Stripe + Express');
      });
      done();
    });
  });

  describe('GET /ping', function(){
    it('should return a view', function(done){
      request(app)
      .get('/ping')
      .expect('Content-Type', /html/)
      .expect(200)
      .end(function(err, res){
        res.text.should.equal('pong!');
      });
      done();
    });
  });

});



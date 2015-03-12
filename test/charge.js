process.env.NODE_ENV = 'test';
var app = require('../server/app');
var request = require('supertest');
var should = require('should');

describe('charge.js Routes', function(){

  describe('GET /scram', function(){
    it('should return a view', function(done){
      request(app)
      .get('/stripe')
      .expect('Content-Type', /html/)
      .expect(200)
      .end(function(err, res){
        res.text.should.eql('Scram!');
      });
      done();
    });
  });

  describe('GET /charge', function(){
    it('should return a view', function(done){
      request(app)
      .get('/charge')
      .expect('Content-Type', /html/)
      .expect(200)
      .end(function(err, res){
        res.text.should.containEql('<h1>Charge</h1>');
      });
      done();
    });
  });

});



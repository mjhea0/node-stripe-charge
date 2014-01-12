var app = require('../app');
var request = require('supertest');
var assert = require('assert');

describe('node-stripe-charge', function(){

  describe('when requesting resource /', function(){
    it('should return a view', function(done){
      request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done)
      .end(function(err, res){
        if (err) throw err;
      });
      done();
    });
  });

  describe('when requesting resource /ping', function(){
    it('should return a view', function(done){
      request(app)
      .get('/ping')
      .expect('Content-Type', /html/)
      .expect(200)
      .end(function(err, res){
        if (err) throw err;
          assert(res.text == 'pong!');
      });
      done();
    });
  });

  describe('when requesting resource /scram', function(){
    it('should return a view', function(done){
      request(app)
      .get('/stripe')
      .expect('Content-Type', /html/)
      .expect(200)
      .end(function(err, res){
        if (err) throw err;
          assert(res.text == 'Scram!');
      });
      done();
    });
  });

});



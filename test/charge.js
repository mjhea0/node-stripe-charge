process.env.NODE_ENV = 'test';
var app = require('../server/app');
var request = require('supertest');
var assert = require('assert');

describe('charge.js Routes', function(){

  describe('GET /scram', function(){
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



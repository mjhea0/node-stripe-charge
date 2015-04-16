process.env.NODE_ENV = 'test';
var app = require('../server/app'),
    request = require('supertest'),
    assert = require("assert");

describe('charge.js Routes', function(){

  describe('GET /scram', function(){
    it('should return a view', function(done){
      request(app)
      .get('/stripe')
      .end(function(err, res){
        assert.equal(res.statusCode, 200);
        assert.equal(res.status, 200);
        assert.equal(res.type, 'text/html');
        assert.equal(res.text, 'Scram!');
        done();
      });
    });
  });

  // describe('GET /charge', function(){
  //   it('should return a view', function(done){
  //     request(app)
  //     .get('/charge')
  //     .end(function(err, res){
  //       assert.equal(res.statusCode, 200);
  //       assert.equal(res.status, 200);
  //       assert.equal(res.type, 'text/html');
  //       res.text.should.containEql('<h1>Charge</h1>');
  //       done();
  //     });
  //   });
  // });

});



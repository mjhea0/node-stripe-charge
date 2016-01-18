process.env.NODE_ENV = 'test';

var request = require('supertest');
var assert = require("assert");

var app = require('../../src/server/app');


describe('error handlers', function(){

  describe('GET /does_not_exist', function(){
    it('should return a view', function(done){
      request(app)
      .get('/does_not_exist')
      .end(function(err, res){
        assert.equal(res.statusCode, 404);
        assert.equal(res.status, 404);
        assert.equal(res.type, 'application/json');
        assert.equal(
          res.text,
          '{"status":"error","data":null,"message":"Not Found"}'
        );
        done();
      });
    });
  });

});



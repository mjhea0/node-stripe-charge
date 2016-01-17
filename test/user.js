process.env.NODE_ENV = 'test';
var app = require('../src/server/app'),
    request = require('supertest'),
    assert = require("assert");


describe('user.js Routes', function(){

  describe('GET /', function(){
    it('should return an error message', function(done){
      request(app)
      .get('/users')
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

});



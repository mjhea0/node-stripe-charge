process.env.NODE_ENV = 'test';
var app = require('../server/app'),
    request = require('supertest'),
    assert = require("assert");


describe('error handlers', function(){

  describe('GET /does_not_exist', function(){
    it('should return a view', function(done){
      request(app)
      .get('/does_not_exist')
      .end(function(err, res){
        assert.equal(res.statusCode, 404);
        assert.equal(res.status, 404);
        assert.equal(res.type, 'text/html');
        res.text.should.containEql('Not Found');
        done();
      });
    });
  });

});



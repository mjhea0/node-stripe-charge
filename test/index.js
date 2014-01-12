var app = require('../app');
var request = require('supertest');
var assert = require('assert');

describe('node-stripe-charge', function(){
  describe('when requesting resource /', function(){
    it('should respond with 200', function(done){
      request(app)
        .get('/')
        .expect('Content-Type', /html/)
        .expect(200, done);
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
          assert.equal(res.text, 'pong!');
      });
      done();
    });
  });



  // describe('when requesting resource /missing', function(){
  //   it('should respond with 404', function(done){
  //     request(app)
  //       .get('/missing')
  //       .expect(404, done);
  //   })
  // });

});



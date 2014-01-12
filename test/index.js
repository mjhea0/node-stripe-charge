var app = require('../app');
var request = require('supertest');

describe('node-stripe-charge', function(){
  describe('when requesting resource /ping', function(){
    it('should respond with 200', function(done){
      request(app)
        .get('/ping')
        .expect(200, done);
    });
  });

  describe('when requesting resource /', function(){
    it('should respond with 200', function(done){
      request(app)
        .get('/ping')
        .expect(200, done);
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



process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var app = require('../src/server/app');
var should = chai.should();

chai.use(chaiHttp);


describe('error handlers', function(){

  describe('GET /does_not_exist', function(){
    it('should return a 404 view', function(done){
      chai.request(app)
      .get('/does_not_exist')
      .end(function(err, res){
        res.should.have.status(404);
        res.should.be.html;  // jshint ignore:line
        res.text.should.contain.string('Not Found');
        done();
      });
    });
  });

});



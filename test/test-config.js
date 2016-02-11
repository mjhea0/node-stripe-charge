process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var app = require('../src/server/app');
var should = chai.should();

chai.use(chaiHttp);


describe('app environment', function(){

  it ('should be "test"', function(done) {
    process.env.NODE_ENV.should.equal('test');
    process.env.NODE_ENV.should.not.equal('development');
    process.env.NODE_ENV.should.not.equal('stage');
    done();
  });

});


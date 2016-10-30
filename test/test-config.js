process.env.NODE_ENV = 'test';

const chai = require('chai'),
  chaiHttp = require('chai-http'),

  // app = require('../src/server/app'),
  should = chai.should(); // eslint-disable-line no-unused-vars

chai.use(chaiHttp);


describe('app environment', () => {

  it('should be "test"', done => {
    process.env.NODE_ENV.should.equal('test');
    process.env.NODE_ENV.should.not.equal('development');
    process.env.NODE_ENV.should.not.equal('stage');
    done();
  });

});


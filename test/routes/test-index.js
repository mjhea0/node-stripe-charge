process.env.NODE_ENV = 'test';

const chai = require('chai'),
  chaiHttp = require('chai-http'),

  app = require('../../src/server/app'),
  should = chai.should(); // eslint-disable-line no-unused-vars

chai.use(chaiHttp);


describe('index.js Routes', () => {

  describe('GET /', () => {
    it('should return a view', done => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html; // eslint-disable-line no-unused-expressions
          res.text.should.contain.contain('<h1>Node + Stripe + Express</h1>');
          done();
        });
    });
  });

  describe('GET /ping', () => {
    it('should return a view', done => {
      chai.request(app)
        .get('/ping')
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.contain.equal('pong!');
          done();
        });
    });
  });

});

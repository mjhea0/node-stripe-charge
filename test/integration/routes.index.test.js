process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../src/server/app');

describe('routes : index', () => {

  describe('GET /', () => {
    it('should return a view', (done) => {
      chai.request(server)
      .get('/')
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        res.type.should.eql('text/html');
        res.text.should.contain.contain('<h1>Node + Stripe + Express</h1>');
        done();
      });
    });
  });

  describe('GET /ping', () => {
    it('should return a view', (done) => {
      chai.request(server)
      .get('/ping')
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        res.text.should.contain.eql('pong!');
        done();
      });
    });
  });

  describe('GET /404', () => {
    it('should throw an error', (done) => {
      chai.request(server)
      .get('/404')
      .end((err, res) => {
        should.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(404);
        res.type.should.eql('text/html');
        res.text.should.contain('Not found');
        done();
      });
    });
  });

});

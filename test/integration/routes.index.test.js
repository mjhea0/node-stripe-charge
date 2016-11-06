process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../src/server/app');

describe('routes : index', () => {

  beforeEach((done) => {
    done();
  });

  afterEach((done) => {
    done();
  });

  describe('GET /', () => {
    it('should render the index', (done) => {
      chai.request(server)
      .get('/')
      .end((err, res) => {
        res.redirects.length.should.equal(0);
        res.status.should.equal(200);
        res.type.should.equal('text/html');
        res.text.should.contain('<h1>Welcome to Express!</h1>');
        res.text.should.contain('<h2>The sum is 3</h2>');
        done();
      });
    });
  });

  describe('GET /404', () => {
    it('should throw an error', (done) => {
      chai.request(server)
      .get('/404')
      .end((err, res) => {
        res.redirects.length.should.equal(0);
        res.status.should.equal(404);
        res.type.should.equal('application/json');
        res.body.message.should.eql('Not Found');
        done();
      });
    });
  });

});

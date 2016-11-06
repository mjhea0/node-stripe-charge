process.env.NODE_ENV = 'test';

const chai = require('chai'),
  chaiHttp = require('chai-http'),

  app = require('../src/server/app'),
  should = chai.should(); // eslint-disable-line no-unused-vars

chai.use(chaiHttp);


describe('error handlers', () => {
  describe('GET /does_not_exist', () => {
    it('should return a 404 view', done => {
      chai.request(app)
        .get('/does_not_exist')
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.html; // eslint-disable-line no-unused-expressions
          res.text.should.contain.string('Not Found');

          done();
        });
    });
  });

});

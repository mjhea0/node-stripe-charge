process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const passportStub = require('passport-stub');

const server = require('../../src/server/app');
const knex = require('../../src/server/db/connection');
const userQueries = require('../../src/server/db/queries/users');

chai.use(chaiHttp);
passportStub.install(server);

describe('routes : auth', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
    .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    passportStub.logout();
    return knex.migrate.rollback();
  });

  describe('GET /users/:id', () => {
    it('should return a success', (done) => {
      passportStub.login({
        email: 'jeremy@realpython.com',
        password: 'johnson123'
      });
      userQueries.getUserByEmail('jeremy@realpython.com')
      .then((user) => {
        chai.request(server)
        .get(`/users/${user.id}`)
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.status.should.eql('success');
          done();
        });
      });
    });
    it('should throw an error if a user is not logged in', (done) => {
      chai.request(server)
      .get('/users/4')
      .end((err, res) => {
        should.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(401);
        res.type.should.eql('application/json');
        res.body.status.should.eql('Please log in');
        done();
      });
    });
  });

});

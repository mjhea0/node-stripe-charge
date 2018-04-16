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
          res.type.should.eql('text/html');
          res.text.should.contain(`<h1>Welcome, ${user.email}!</h1>`);
          done();
        });
      });
    });
    it('should error if a user is not logged in', (done) => {
      chai.request(server)
      .get('/users/4')
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(1);
        res.status.should.eql(200);
        res.type.should.eql('text/html');
        res.text.should.contain.contain('<h1>Login</h1>');
        done();
      });
    });
    it('should error if the wrong profile is accessed', (done) => {
      passportStub.login({
        email: 'jeremy@realpython.com',
        password: 'johnson123'
      });
      userQueries.getUserByEmail('jeremy@realpython.com')
      .then((user) => {
        chai.request(server)
        .get('/users/999')
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(500);
          res.type.should.eql('text/html');
          res.text.should.contain('<h1>Something went wrong</h1>');
          done();
        });
      });
    });
  });

  describe('GET /users/:id/admin', () => {
    it('should return a success', (done) => {
      passportStub.login({
        email: 'ad@min.com',
        password: 'admin'
      });
      userQueries.getUserByEmail('ad@min.com')
      .then((user) => {
        chai.request(server)
        .get(`/users/${user.id}/admin`)
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('text/html');
          res.text.should.contain('<h1>Admin Portal</h1>');
          done();
        });
      });
    });
    it('should error if a user is not logged in', (done) => {
      chai.request(server)
      .get('/users/4/admin')
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(500);
        res.type.should.eql('text/html');
        res.text.should.contain.contain('<h1>Something went wrong</h1>');
        done();
      });
    });
    it('should error if the wrong profile is accessed', (done) => {
      passportStub.login({
        email: 'ad@min.com',
        password: 'admin'
      });
      userQueries.getUserByEmail('ad@min.com')
      .then((user) => {
        chai.request(server)
        .get('/users/999/admin')
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(500);
          res.type.should.eql('text/html');
          res.text.should.contain('<h1>Something went wrong</h1>');
          done();
        });
      });
    });
  });

});

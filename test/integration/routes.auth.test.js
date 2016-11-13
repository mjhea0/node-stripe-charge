process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const passportStub = require('passport-stub');

const server = require('../../src/server/app');
const knex = require('../../src/server/db/connection');

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

  describe('POST /auth/register', () => {
    it('should register a new user', (done) => {
      chai.request(server)
      .post('/auth/register')
      .send({
        email: 'michael@mherman.org',
        password: 'herman'
      })
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

  describe('POST /auth/login', () => {
    it('should log in a user', (done) => {
      chai.request(server)
      .post('/auth/login')
      .send({
        email: 'jeremy@realpython.com',
        password: 'johnson123'
      })
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(1);
        res.status.should.eql(200);
        res.type.should.eql('text/html');
        res.text.should.contain('<h1>Node + Stripe + Express</h1>');
        done();
      });
    });
    it('should not log in if password is incorrect', (done) => {
      chai.request(server)
      .post('/auth/login')
      .send({
        email: 'jeremy@realpython.com',
        password: 'notright'
      })
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(1);
        res.status.should.eql(200);
        res.type.should.eql('text/html');
        res.text.should.contain('<h1>Login</h1>');
        res.text.should.not.contain(
          '<li><a href="/auth/logout">Logout</a></li>');
        done();
      });
    });
    it('should not log in an unregistered user', (done) => {
      chai.request(server)
      .post('/auth/login')
      .send({
        email: 'michael@realpython.com',
        password: 'johnson123'
      })
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(1);
        res.status.should.eql(200);
        res.type.should.eql('text/html');
        res.text.should.contain('<h1>Login</h1>');
        res.text.should.not.contain(
          '<li><a href="/auth/logout">Logout</a></li>');
        done();
      });
    });
  });

  describe('GET /auth/logout', () => {
    it('should logout a user', (done) => {
      passportStub.login({
        email: 'jeremy@realpython.com',
        password: 'johnson123'
      });
      chai.request(server)
      .get('/auth/logout')
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(1);
        res.status.should.eql(200);
        res.type.should.eql('text/html');
        res.text.should.contain('<h1>Node + Stripe + Express</h1>');
        res.text.should.contain(
          '<li><a href="/auth/login">Register/Login</a></li>');
        res.text.should.not.contain(
          '<li><a href="/auth/logout">Logout</a></li>');
        done();
      });
    });
    it('should throw an error if a user is not logged in', (done) => {
      chai.request(server)
      .get('/auth/logout')
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(1);
        res.status.should.eql(200);
        res.type.should.eql('text/html');
        res.text.should.contain('<h1>Login</h1>');
        done();
      });
    });
  });

  describe('GET /auth/login', () => {
    it('should return a view', (done) => {
      chai.request(server)
      .get('/auth/login')
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        res.type.should.eql('text/html');
        res.text.should.contain('<h1>Login</h1>');
        done();
      });
    });
    it('should redirect if a user is logged in', (done) => {
      passportStub.login({
        email: 'jeremy@realpython.com',
        password: 'johnson123'
      });
      chai.request(server)
      .get('/auth/login')
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        res.redirects.length.should.eql(1);
        res.type.should.eql('text/html');
        res.text.should.contain('<h1>Node + Stripe + Express</h1>');
        done();
      });
    });
  });

});

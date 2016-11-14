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

describe('routes : api : users', () => {

  describe('when authenticated as an admin', () => {
    beforeEach(() => {
      return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); })
      .then(() => {
        passportStub.login({
          email: 'ad@min.com',
          password: 'admin'
        });
      });
    });
    afterEach(() => {
      passportStub.logout();
      return knex.migrate.rollback();
    });
    describe('GET api/v1/users', () => {
      it('should return all users', (done) => {
        chai.request(server)
        .get('/api/v1/users')
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.status.should.eql('success');
          res.body.data.length.should.eql(2);
          res.body.message.should.eql('Retrieved all users.');
          res.body.should.be.instanceof(Object);
          res.body.data.should.be.instanceof(Array);
          done();
        });
      });
    });
    describe('GET api/v1/users/:id', () => {
      it('should return a single user', (done) => {
        userQueries.getUserByEmail('jeremy@realpython.com')
        .then((result) => {
          const userID = result.id;
          chai.request(server)
          .get(`/api/v1/users/${userID}`)
          .end((err, res) => {
            should.not.exist(err);
            res.redirects.length.should.eql(0);
            res.status.should.eql(200);
            res.type.should.eql('application/json');
            res.body.status.should.eql('success');
            res.body.data.email.should.eql(result.email);
            res.body.data.admin.should.eql(result.admin);
            res.body.message.should.eql('Retrieved single user.');
            res.body.should.be.instanceof(Object);
            done();
          });
        });
      });
    });
    describe('POST api/v1/users', () => {
      it('should add a user', (done) => {
        const user = {
          email: 'your@name.com',
          password: 'name123456'
        };
        chai.request(server)
        .post('/api/v1/users')
        .send(user)
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.status.should.eql('success');
          res.body.data.email.should.eql('your@name.com');
          res.body.data.admin.should.eql(false);
          res.body.message.should.eql('Created user.');
          res.body.should.be.instanceof(Object);
          done();
        });
      });
    });
    describe('PUT api/v1/users/:id', () => {
      it('should update a single user', done => {
        userQueries.getUserByEmail('jeremy@realpython.com')
        .then((result) => {
          const userID = result.id;
          chai.request(server)
          .put(`/api/v1/users/${userID}`)
          .send({
            email: 'testing@put.route'
          })
          .end((err, res) => {
            should.not.exist(err);
            res.redirects.length.should.eql(0);
            res.status.should.eql(200);
            res.type.should.eql('application/json');
            res.body.status.should.eql('success');
            res.body.data.email.should.eql('testing@put.route');
            res.body.message.should.eql('Updated user.');
            res.body.should.be.instanceof(Object);
            done();
          });
        });
      });
    });
    describe('DELETE api/v1/users/:id', () => {
      it('should delete a single user', done => {
        userQueries.getUserByEmail('jeremy@realpython.com')
        .then(result => {
          const userID = result.id;
          chai.request(server)
          .delete(`/api/v1/users/${userID}`)
          .end((err, res) => {
            should.not.exist(err);
            res.redirects.length.should.eql(0);
            res.status.should.eql(200);
            res.type.should.eql('application/json');
            res.body.status.should.eql('success');
            res.body.data.email.should.eql(result.email);
            res.body.data.admin.should.eql(result.admin);
            res.body.message.should.eql('Removed user.');
            res.body.should.be.instanceof(Object);
            done();
          });
        });
      });
    });
  });

});

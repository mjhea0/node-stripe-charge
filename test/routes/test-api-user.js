process.env.NODE_ENV = 'test';

const chai = require('chai'),
  chaiHttp = require('chai-http'),
  mongoose = require('mongoose-q')(require('mongoose')),
  passportStub = require('passport-stub'),

  app = require('../../src/server/app'),
  User = require('../../src/server/models/user'),
  should = chai.should(); // eslint-disable-line no-unused-vars

passportStub.install(app);
chai.use(chaiHttp);


describe('User API Routes when authenticated', () => {

  beforeEach(done => {

    mongoose.connection.db.dropDatabase();

    const newUser = new User({
      email: 'test@test.com',
      password: 'test',
      admin: true,
      products: [{ token: '12345' }]
    });

    newUser.saveQ()
    .then(user => {
      passportStub.login(user);
      done();
    });

  });

  afterEach(done => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  describe('GET api/v1/users', () => {
    it('should return all users', done => {
      chai.request(app)
        .get('/api/v1/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;  // eslint-disable-line no-unused-expressions
          res.body.status.should.equal('success');
          res.body.data.length.should.equal(1);
          res.body.data[0].email.should.equal('test@test.com');
          res.body.data[0].admin.should.equal(true);
          res.body.message.should.equal('Retrieved users.');
          res.body.should.be.instanceof(Object);
          res.body.data.should.be.instanceof(Array);
          done();
        });
    });
  });

  describe('POST api/v1/users', () => {
    it('should add a user', done => {
      const user = {
        email: 'your@name.com',
        password: 'name123456'
      };

      chai.request(app)
        .post('/api/v1/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json; // eslint-disable-line no-unused-expressions
          res.body.status.should.equal('success');
          res.body.data.email.should.equal('your@name.com');
          res.body.data.admin.should.equal(false);
          res.body.message.should.equal('Created user.');
          res.body.should.be.instanceof(Object);
          done();
        });
    });
  });

  describe('GET api/v1/users/:id', () => {
    it('should return a single user', done => {
      User.findOneQ()
      .then(result => {
        const userID = result._id;

        chai.request(app)
          .get(`/api/v1/users/${userID}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;  // eslint-disable-line no-unused-expressions
            res.body.status.should.equal('success');
            res.body.data.email.should.equal('test@test.com');
            res.body.data.admin.should.equal(true);
            res.body.message.should.equal('Retrieved user.');
            res.body.should.be.instanceof(Object);
            done();
          });
      });
    });
  });

  describe('PUT api/v1/users/:id', () => {
    it('should update a single user', done => {
      User.findQ()
      .then(result => {
        chai.request(app)
        .put(`/api/v1/users/${result[0]._id}`)
        .send({
          email: 'testing@put.route',
          admin: false
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json; // eslint-disable-line no-unused-expressions
          res.body.status.should.equal('success');
          res.body.data.email.should.equal('testing@put.route');
          res.body.data.admin.should.equal(false);
          res.body.message.should.equal('Updated user.');
          res.body.should.be.instanceof(Object);
          done();
        });
      });
    });
  });

  describe('DELETE api/v1/users/:id', () => {
    it('should delete a single user', done => {
      User.findQ()
        .then(result => {
          chai.request(app)
            .delete(`/api/v1/users/${result[0]._id}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json; // eslint-disable-line no-unused-expressions
              res.body.status.should.equal('success');
              res.body.data.email.should.equal('test@test.com');
              res.body.data.admin.should.equal(true);
              res.body.message.should.equal('Removed user.');
              res.body.should.be.instanceof(Object);
              done();
            });
        });
    });
  });

});

describe('User API Routes when NOT authenticated', () => {

  beforeEach(done => {

    mongoose.connection.db.dropDatabase();

    const newUser = new User({
      email: 'test@test.com',
      password: 'test',
      admin: false,
      products: [{ token: '12345' }]
    });

    newUser.saveQ()
    .then(() => {
      passportStub.logout();
      done();
    });

  });

  afterEach(done => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  describe('GET api/v1/users', () => {
    it('should return all users', done => {
      chai.request(app)
        .get('/api/v1/users')
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.json; // eslint-disable-line no-unused-expressions
          res.body.status.should.equal('error');
          res.body.message.should.equal(
            'You do not have permission to do that.'
          );
          res.body.should.be.instanceof(Object);
          done();
        });
    });
  });

  describe('POST api/v1/users', () => {
    it('should add a user', done => {
      const user = {
        email: 'your@name.com',
        password: 'name123456'
      };

      chai.request(app)
        .post('/api/v1/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.json; // eslint-disable-line no-unused-expressions
          res.body.status.should.equal('error');
          res.body.message.should.equal(
            'You do not have permission to do that.'
          );
          res.body.should.be.instanceof(Object);
          done();
        });
    });
  });

  describe('GET api/v1/users/:id', () => {
    it('should return a single user', done => {
      User.findOneQ()
      .then(result => {
        const userID = result._id;

        chai.request(app)
          .get(`/api/v1/users/${userID}`)
          .end((err, res) => {
            res.should.have.status(401);
            res.should.be.json; // eslint-disable-line no-unused-expressions
            res.body.status.should.equal('error');
            res.body.message.should.equal(
              'You do not have permission to do that.'
            );
            res.body.should.be.instanceof(Object);
            done();
          });
      });
    });
  });

  describe('PUT api/v1/users/:id', () => {
    it('should update a single user', done => {
      User.findQ()
      .then(result => {
        chai.request(app)
        .put(`/api/v1/users/${result[0]._id}`)
        .send({
          email: 'testing@put.route',
          admin: false
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.json; // eslint-disable-line no-unused-expressions
          res.body.status.should.equal('error');
          res.body.message.should.equal(
            'You do not have permission to do that.'
          );
          res.body.should.be.instanceof(Object);
          done();
        });
      });
    });
  });

  describe('DELETE api/v1/users/:id', () => {
    it('should delete a single user', done => {
      User.findQ()
        .then(result => {
          chai.request(app)
            .delete(`/api/v1/users/${result[0]._id}`)
            .end((err, res) => {
              res.should.have.status(401);
              res.should.be.json;  // eslint-disable-line no-unused-expressions
              res.body.status.should.equal('error');
              res.body.message.should.equal(
                'You do not have permission to do that.'
              );
              res.body.should.be.instanceof(Object);
              done();
            });
        });
    });
  });

});

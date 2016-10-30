process.env.NODE_ENV = 'test';

const chai = require('chai'),
  chaiHttp = require('chai-http'),
  mongoose = require('mongoose-q')(require('mongoose')),
  passportStub = require('passport-stub'),

  app = require('../../src/server/app'),
  User = require('../../src/server/models/user.js'),
  should = chai.should(); // eslint-disable-line no-unused-vars

passportStub.install(app);
chai.use(chaiHttp);


describe('auth.js Routes', () => {

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

  describe('GET auth/login', () => {

    it('should return the login view if user is NOT logged in', done => {
      passportStub.logout();

      chai.request(app)
        .get('/auth/login')
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.contain('<h1>Login</h1>\n');
          done();
        });
    });

    it('should redirect to "/" if user is logged in', done => {
      chai.request(app)
        .get('/auth/login')
        .end((err, res) => {
          res.should.have.status(200);
          res.redirects[0].should.contain('/');
          res.should.be.html; // eslint-disable-line no-unused-expressions
          res.text.should.contain('<h1>Node + Stripe + Express</h1>');
          done();
        });
    });

  });

  describe('GET auth/register', () => {
    it('should return the Register view', done => {
      chai.request(app)
        .get('/auth/register')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html; // eslint-disable-line no-unused-expressions
          res.text.should.contain('<h1>Register</h1>\n');
          done();
        });
    });
  });

  describe('POST auth/register', () => {
    it('should register a user', done => {
      passportStub.logout();

      const newTestUser = {
        email: 'michael@test.com',
        password: 'testing',
        admin: false,
        products: [{ token: '123456789' }]
      };

      chai.request(app)
        .post('/auth/register')
        .send(newTestUser)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html; // eslint-disable-line no-unused-expressions
          res.text.should.contain('<h1>Node + Stripe + Express</h1>');

          User.findOne({ email: 'michael@test.com' }, (error, user) => {
            user.email.should.equal('michael@test.com');
            user.admin.should.equal(false);
            done();
          });
        });
    });
  });

  describe('GET auth/logout', () => {

    it('should redirect to "/" if user is logged in', done => {
      chai.request(app)
        .get('/auth/logout')
        .end((err, res) => {
          res.should.have.status(200);
          res.redirects[0].should.contain('/');
          res.should.be.html; // eslint-disable-line no-unused-expressions
          res.text.should.contain('<h1>Node + Stripe + Express</h1>');
          done();
        });
    });

    it('should redirect to "/auth/login" if user is NOT logged in', done => {
      passportStub.logout();
      chai.request(app)
        .get('/auth/logout')
        .end((err, res) => {
          res.should.have.status(200);
          res.redirects[0].should.contain('/auth/login');
          res.should.be.html; // eslint-disable-line no-unused-expressions
          res.text.should.contain('<h1>Login</h1>\n');
          done();
        });
    });

  });

  describe('GET auth/admin', () => {

    it('should redirect if user is not an admin', done => {
      passportStub.logout();
      chai.request(app)
        .get('/auth/admin')
        .end((err, res) => {
          res.should.have.status(200);
          res.redirects[0].should.contain('/auth/login');
          res.text.should.contain('<h1>Login</h1>\n');
          done();
        });
    });

  });

});

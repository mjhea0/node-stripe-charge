process.env.NODE_ENV = 'test';

const chai = require('chai'),
  chaiHttp = require('chai-http'),
  mongoose = require('mongoose-q')(require('mongoose')),
  passportStub = require('passport-stub'),

  app = require('../../src/server/app'),
  Store = require('../../src/server/models/store.js'),
  User = require('../../src/server/models/user.js'),
  should = chai.should(); // eslint-disable-line no-unused-vars

passportStub.install(app);
chai.use(chaiHttp);


describe('Store API Routes when authenticated', () => {

  beforeEach(done => {
    mongoose.connection.db.dropDatabase();

    const newUser = new User({
        email: 'test@test.com',
        password: 'test',
        admin: true,
        products: [{ token: '12345' }]
      }),
      newStore = new Store({
        name: 'Toys',
        description: 'Just a toy store'
      });

    newStore.saveQ().then(() => {
      newUser.saveQ().then(user => {
        passportStub.login(user);
        done();
      });
    });

  });

  afterEach(done => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  describe('GET api/v1/stores', () => {
    it('should return all stores', done => {
      chai.request(app).get('/api/v1/stores')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json; // eslint-disable-line no-unused-expressions
          res.body.status.should.equal('success');
          res.body.data.length.should.equal(1);
          res.body.data[0].name.should.equal('Toys');
          res.body.data[0].description.should.equal('Just a toy store');
          res.body.message.should.equal('Retrieved stores.');
          res.body.should.be.instanceof(Object);
          res.body.data.should.be.instanceof(Array);
          done();
        });
    });
  });

  describe('POST api/v1/stores', () => {
    it('should add a store', done => {
      const store = {
        name: 'Socks',
        description: 'Just a sock store'
      };

      chai.request(app)
        .post('/api/v1/stores')
        .send(store)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json; // eslint-disable-line no-unused-expressions
          res.body.status.should.equal('success');
          res.body.data.name.should.equal('Socks');
          res.body.data.description.should.equal('Just a sock store');
          res.body.message.should.equal('Created store.');
          res.body.should.be.instanceof(Object);
          done();
        });
    });
  });

  describe('GET api/v1/stores/:id', () => {
    it('should return a single store', done => {
      Store.findOneQ()
        .then(result => {
          const storeID = result._id;

          chai.request(app)
            .get(`/api/v1/stores/${storeID}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json; // eslint-disable-line no-unused-expressions
              res.body.status.should.equal('success');
              res.body.data.name.should.equal('Toys');
              res.body.data.description.should.equal('Just a toy store');
              res.body.message.should.equal('Retrieved store.');
              res.body.should.be.instanceof(Object);
              done();
            });
        });
    });
  });

  describe('PUT api/v1/stores/:id', () => {
    it('should update a single store', done => {
      Store.findQ().then(result => {
        chai.request(app).put(`/api/v1/stores/${result[0]._id}`)
          .send({
            name: 'Sodas',
            description: 'Just a soda store'
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json; // eslint-disable-line no-unused-expressions
            res.body.status.should.equal('success');
            res.body.data.name.should.equal('Sodas');
            res.body.data.description.should.equal('Just a soda store');
            res.body.message.should.equal('Updated store.');
            res.body.should.be.instanceof(Object);
            done();
          });
      });
    });
  });

});

describe('Store API Routes when NOT authenticated', () => {

  beforeEach(done => {

    mongoose.connection.db.dropDatabase();

    const newStore = new Store({
      name: 'Toys',
      description: 'Just a toy store'
    });

    newStore.saveQ()
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

  describe('GET api/v1/stores', () => {
    it('should return all stores', done => {
      chai.request(app)
      .get('/api/v1/stores')
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

  describe('POST api/v1/stores', () => {
    it('should add a store', done => {
      const store = {
        name: 'Socks',
        description: 'Just a sock store'
      };

      chai.request(app)
        .post('/api/v1/stores')
        .send(store)
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

  describe('GET api/v1/stores/:id', () => {
    it('should return a single store', done => {
      Store.findOneQ()
        .then(result => {
          const storeID = result._id;

          chai.request(app)
            .get(`/api/v1/stores/${storeID}`)
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

  describe('PUT api/v1/stores/:id', () => {
    it('should update a single store', done => {
      Store.findQ()
        .then(result => {
          chai.request(app)
            .put(`/api/v1/stores/${result[0]._id}`)
            .send({
              name: 'Sodas',
              description: 'Just a soda store'
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

  describe('DELETE api/v1/stores/:id', () => {
    it('should delete a single store', done => {
      Store.findQ()
        .then(result => {
          chai.request(app)
            .delete(`/api/v1/stores/${result[0]._id}`)
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

});

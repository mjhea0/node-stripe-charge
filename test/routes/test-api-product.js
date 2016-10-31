process.env.NODE_ENV = 'test';

const chai = require('chai'),
  chaiHttp = require('chai-http'),
  mongoose = require('mongoose-q')(require('mongoose')),
  passportStub = require('passport-stub'),

  app = require('../../src/server/app'),
  Product = require('../../src/server/models/product.js'),
  User = require('../../src/server/models/user.js'),
  should = chai.should(); // eslint-disable-line no-unused-vars

passportStub.install(app);
chai.use(chaiHttp);


describe('Product API Routes when authenticated', () => {

  beforeEach(done => {

    mongoose.connection.db.dropDatabase();

    const newUser = new User({
        email: 'test@test.com',
        password: 'test',
        admin: true,
        products: [{ token: '12345' }]
      }),

      newProduct = new Product({
        name: 'Coconut Water',
        amount: 5,
        currency: 'USD',
        forSale: true
      });

    newProduct.saveQ()
      .then(() => {
        newUser.saveQ()
        .then(user => {
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

  describe('GET api/v1/products', () => {
    it('should return all products', done => {
      chai.request(app)
        .get('/api/v1/products')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json; // eslint-disable-line no-unused-expressions
          res.body.status.should.equal('success');
          res.body.data.length.should.equal(1);
          res.body.data[0].name.should.equal('Coconut Water');
          res.body.data[0].amount.should.equal(5);
          res.body.message.should.equal('Retrieved products.');
          res.body.should.be.instanceof(Object);
          res.body.data.should.be.instanceof(Array);
          done();
        });
    });
  });

  describe('POST api/v1/products', () => {
    it('should add a product', done => {
      const product = {
        name: 'Socks',
        amount: 22.99
      };

      chai.request(app)
        .post('/api/v1/products')
        .send(product)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json; // eslint-disable-line no-unused-expressions
          res.body.status.should.equal('success');
          res.body.data.name.should.equal('Socks');
          res.body.data.amount.should.equal(22.99);
          res.body.message.should.equal('Created product.');
          res.body.should.be.instanceof(Object);
          done();
        });
    });
  });

  describe('GET api/v1/products/:id', () => {
    it('should return a single product', done => {
      Product.findOneQ()
      .then(result => {
        const productID = result._id;

        chai.request(app)
          .get(`/api/v1/products/${productID}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json; // eslint-disable-line no-unused-expressions
            res.body.status.should.equal('success');
            res.body.data.name.should.equal('Coconut Water');
            res.body.data.amount.should.equal(5);
            res.body.message.should.equal('Retrieved product.');
            res.body.should.be.instanceof(Object);
            done();
          });
      });
    });
  });

  describe('PUT api/v1/products/:id', () => {
    it('should update a single product', done => {
      Product.findQ()
        .then(result => {
          chai.request(app)
            .put(`/api/v1/products/${result[0]._id}`)
            .send({
              name: 'Soda Pop',
              amount: 3
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json; // eslint-disable-line no-unused-expressions
              res.body.status.should.equal('success');
              res.body.data.name.should.equal('Soda Pop');
              res.body.data.amount.should.equal(3);
              res.body.message.should.equal('Updated product.');
              res.body.should.be.instanceof(Object);
              done();
            });
        });
    });
  });

  describe('DELETE api/v1/products/:id', () => {
    it('should delete a single product', done => {
      Product.findQ()
        .then(result => {
          chai.request(app)
            .delete(`/api/v1/products/${result[0]._id}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json; // eslint-disable-line no-unused-expressions
              res.body.status.should.equal('success');
              res.body.data.name.should.equal('Coconut Water');
              res.body.data.amount.should.equal(5);
              res.body.message.should.equal('Removed product.');
              res.body.should.be.instanceof(Object);
              done();
            });
        });
    });
  });

});

describe('Product API Routes when NOT authenticated', () => {

  beforeEach(done => {

    mongoose.connection.db.dropDatabase();

    const newProduct = new Product({
      name: 'Coconut Water',
      amount: 5,
      currency: 'USD',
      forSale: true
    });

    newProduct.saveQ()
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

  describe('GET api/v1/products', () => {
    it('should return all products', done => {
      chai.request(app)
        .get('/api/v1/products')
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

  describe('POST api/v1/products', () => {
    it('should add a product', done => {
      const product = {
        name: 'Socks',
        amount: 22.99
      };

      chai.request(app)
        .post('/api/v1/products')
        .send(product)
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

  describe('GET api/v1/products/:id', () => {
    it('should return a single product', done => {
      Product.findOneQ()
        .then(result => {
          const productID = result._id;

          chai.request(app)
            .get(`/api/v1/products/${productID}`)
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

  describe('PUT api/v1/products/:id', () => {
    it('should update a single product', done => {
      Product.findQ()
        .then(result => {
          chai.request(app)
            .put(`/api/v1/products/${result[0]._id}`)
            .send({
              name: 'Soda Pop',
              amount: 3
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

  describe('DELETE api/v1/products/:id', () => {
    it('should delete a single product', done => {
      Product.findQ()
        .then(result => {
          chai.request(app)
            .delete(`/api/v1/products/${result[0]._id}`)
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

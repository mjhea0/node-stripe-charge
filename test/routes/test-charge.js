process.env.NODE_ENV = 'test';

const chai = require('chai'),
  chaiHttp = require('chai-http'),
  mongoose = require('mongoose-q')(require('mongoose')),

  app = require('../../src/server/app'),
  Product = require('../../src/server/models/product.js'),
  should = chai.should(); // eslint-disable-line no-unused-vars

chai.use(chaiHttp);


describe('charge.js Routes', () => {

  beforeEach(done => {

    mongoose.connection.db.dropDatabase();

    const product = new Product({
      name: 'Coconut Water',
      amount: 5,
      currency: 'USD',
      forSale: true
    });

    product.saveQ()
      .then(() => {
        done();
      });

  });

  after(done => {
    mongoose.connection.db.dropDatabase();
    done();
  });

  describe('GET /stripe', () => {
    it('should return a view', done => {
      chai.request(app)
      .get('/stripe')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html; // eslint-disable-line no-unused-expressions
        res.text.should.contain.string('Scram!');
        done();
      });
    });
  });

  describe('GET /products', () => {
    xit('should return a view', done => {
      chai.request(app)
        .get('/products')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html; // eslint-disable-line no-unused-expressions
          res.text.should.contain.string('Coconut Water');
          done();
        });
    });
  });

  describe('GET /product/:id', () => {
    xit('should return a view', done => {
      Product.findOne({}, (err, results) => {
        const productID = results._id,
          productPrice = results.amount;

        chai.request(app)
          .get(`/product/${productID}`)
          .end((error, res) => {
            res.should.have.status(200);
            res.should.be.html; // eslint-disable-line no-unused-expressions
            res.text.should.contain.string('Coconut Water');
            res.text.should.contain.string(productPrice);
            done();
          });
      });
    });
  });

  describe('GET /charge', () => {
    xit('should redirect if user is not logged in', done => {
      Product.findOne({}, (err, results) => {
        const productID = results._id;

        chai.request(app)
          .get(`/charge/${productID}`)
          .end((error, res) => {
            res.should.have.status(200);
            res.redirects[0].should.contain('/auth/login');
            res.text.should.contain('<h1>Login</h1>\n');
            done();
          });
      });
    });
  });

});

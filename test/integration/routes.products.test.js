process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../src/server/app');
const knex = require('../../src/server/db/connection');
const productQueries = require('../../src/server/db/queries/products');

describe('routes : products', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
    .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('GET /products', () => {
    it('should return a view', (done) => {
      chai.request(server)
      .get('/products')
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        res.type.should.eql('text/html');
        res.text.should.contain.contain('Large Shirt');
        done();
      });
    });
  });

  describe('GET /products/:id', () => {
    it('should return a view', (done) => {
      productQueries.getSingleProduct(1)
      .then((product) => {
        chai.request(server)
        .get('/products/1')
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.type.should.eql('text/html');
          res.text.should.contain(product.id);
          res.text.should.contain(product.name);
          res.text.should.contain(product.amount);
          done();
        });
      });
    });
    it('should throw an error if the product does not exist', (done) => {
      chai.request(server)
      .get('/products/22')
      .end((err, res) => {
        should.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(500);
        res.type.should.eql('text/html');
        res.text.should.contain('<h1>Something went wrong</h1>');
        done();
      });
    });
  });

  describe('GET /products/:id/charge', () => {
    it('should return a view', (done) => {
      productQueries.getSingleProduct(1)
      .then((product) => {
        chai.request(server)
        .get('/products/1/charge')
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.type.should.eql('text/html');
          res.text.should.contain(product.id);
          res.text.should.contain(product.name);
          res.text.should.contain(product.amount);
          res.text.should.contain('<h2>One time payment</h2>');
          done();
        });
      });
    });
    it('should throw an error if the product does not exist', (done) => {
      chai.request(server)
      .get('/products/22/charge')
      .end((err, res) => {
        should.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(500);
        res.type.should.eql('text/html');
        res.text.should.contain('<h1>Something went wrong</h1>');
        done();
      });
    });
  });

});

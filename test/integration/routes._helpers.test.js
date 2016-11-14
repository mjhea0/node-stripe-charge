process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();

const knex = require('../../src/server/db/connection');
const routeHelpers = require('../../src/server/routes/_helpers');
const productQueries = require('../../src/server/db/queries/products');

describe('routes : helpers', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
    .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('createTransaction()', () => {
    it('should return a product', (done) => {
      productQueries.getSingleProduct(1)
      .then((product) => {
        return routeHelpers.validateProduct(product.id, product.amount)
        .then((res) => {
          res.amount.should.eql(product.amount);
          done();
        });
      });
    });
    it('should error if the product does not exist', () => {
      return routeHelpers.validateProduct(99999, 20.00)
      .then((res) => {
        should.not.exist(res);
      })
      .catch((err) => {
        should.exist(err);
      });
    });
    it('should error if the amount is incorrect', () => {
      productQueries.getSingleProduct(1)
      .then((product) => {
        return routeHelpers.validateProduct(product.id, 999)
        .then((res) => {
          should.not.exist(res);
        })
        .catch((err) => {
          should.exist(err);
        });
      });
    });
  });
});

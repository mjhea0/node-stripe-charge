process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();

const knex = require('../../src/server/db/connection');
const transactionQueries = require('../../src/server/db/queries/transactions');

describe('db : queries : transactions', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
    .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('createTransaction()', () => {
    it('should error if the stripe id is null', (done) => {
      transactionQueries.createTransaction(null, 1, 1, (err) => {
        should.exist(err);
        done();
      });
    });
  });
});

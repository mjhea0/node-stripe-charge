process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const passportStub = require('passport-stub');

const server = require('../../src/server/app');
const knex = require('../../src/server/db/connection');
const productQueries = require('../../src/server/db/queries/products');

chai.use(chaiHttp);
passportStub.install(server);

describe('routes : api : products', () => {

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
    describe('GET api/v1/products', () => {
      it('should return all products', (done) => {
        chai.request(server)
        .get('/api/v1/products')
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.status.should.eql('success');
          res.body.data.length.should.eql(3);
          res.body.message.should.eql('Retrieved all products.');
          res.body.should.be.instanceof(Object);
          res.body.data.should.be.instanceof(Array);
          done();
        });
      });
    });
    describe('GET api/v1/products/:id', () => {
      it('should return a single product', (done) => {
        productQueries.getAllProducts()
        .then((product) => {
          const productID = product[0].id;
          chai.request(server)
          .get(`/api/v1/products/${productID}`)
          .end((err, res) => {
            should.not.exist(err);
            res.redirects.length.should.eql(0);
            res.status.should.eql(200);
            res.type.should.eql('application/json');
            res.body.status.should.eql('success');
            res.body.data.name.should.eql(product[0].name);
            res.body.data.description.should.eql(product[0].description);
            res.body.message.should.eql('Retrieved single product.');
            res.body.should.be.instanceof(Object);
            done();
          });
        });
      });
    });
    describe('POST api/v1/products', () => {
      it('should add a product', (done) => {
        const product = {
          name: 'Real Python',
          description: 'Just some cool course.',
          amount: 10.00
        };
        chai.request(server)
        .post('/api/v1/products')
        .send(product)
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.status.should.eql('success');
          res.body.data.name.should.eql('Real Python');
          res.body.data.description.should.eql('Just some cool course.');
          res.body.message.should.eql('Created product.');
          res.body.should.be.instanceof(Object);
          done();
        });
      });
    });
    describe('PUT api/v1/products/:id', () => {
      it('should update a single product', done => {
        productQueries.getAllProducts()
        .then((result) => {
          const productID = result[0].id;
          chai.request(server)
          .put(`/api/v1/products/${productID}`)
          .send({
            name: 'testing put route'
          })
          .end((err, res) => {
            should.not.exist(err);
            res.redirects.length.should.eql(0);
            res.status.should.eql(200);
            res.type.should.eql('application/json');
            res.body.status.should.eql('success');
            res.body.data.name.should.eql('testing put route');
            res.body.message.should.eql('Updated product.');
            res.body.should.be.instanceof(Object);
            done();
          });
        });
      });
    });
    describe('DELETE api/v1/products/:id', () => {
      it('should delete a single product', done => {
        productQueries.getAllProducts()
        .then(result => {
          const productID = result[0].id;
          chai.request(server)
          .delete(`/api/v1/products/${productID}`)
          .end((err, res) => {
            should.not.exist(err);
            res.redirects.length.should.eql(0);
            res.status.should.eql(200);
            res.type.should.eql('application/json');
            res.body.status.should.eql('success');
            res.body.data.name.should.eql(result[0].name);
            res.body.data.description.should.eql(result[0].description);
            res.body.message.should.eql('Removed product.');
            res.body.should.be.instanceof(Object);
            done();
          });
        });
      });
    });
  });

});

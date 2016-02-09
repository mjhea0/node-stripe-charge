// process.env.NODE_ENV = 'test';

// var request = require('supertest');
// var assert = require("assert");
// var mongoose = require('mongoose-q')(require('mongoose'));

// var app = require('../../../src/server/app');
// var Store = require('../../../src/server/models/store');


// // *** Unauthenticated *** //

// describe('store.js routes when unauthenticated', function(){

//   beforeEach(function(done) {

//     mongoose.connection.db.dropDatabase();

//     var testStore = new Store({
//       'name': 'My store',
//       'description': 'The only store.'
//     });

//     testStore.saveQ()
//     .then(function() {
//       done();
//     });

//   });

//   afterEach(function(done) {
//     mongoose.connection.db.dropDatabase(done);
//   });

//   describe('GET /api/stores', function() {
//     it('should return all stores', function(done){
//       request(app)
//       .get('/api/stores')
//       .end(function(err, res){
//         assert.equal(res.statusCode, 200);
//         assert.equal(res.type, 'application/json');
//         assert.equal(res.body.status, 'success');
//         assert.equal(res.body.data[0].name, 'My store');
//         assert.equal(
//           res.body.data[0].description,
//           'The only store.'
//         );
//         assert.equal(res.body.message, 'Retrieved stores.');
//         done();
//       });
//     });
//   });

//   describe('GET /api/store/:id', function() {
//     it('should return a single store', function(done){
//       Store.findQ()
//       .then(function(result) {
//         request(app)
//         .get('/api/store/' + result[0].id)
//         .end(function(err, res) {
//           assert.equal(res.statusCode, 200);
//           assert.equal(res.type, 'application/json');
//           assert.equal(res.body.status, 'success');
//           assert.equal(res.body.data.name, 'My store');
//           assert.equal(
//             res.body.data.description,
//             'The only store.'
//           );
//           assert.equal(res.body.message, 'Retrieved store.');
//           done();
//         });
//       });
//     });
//   });

//   describe('POST /api/stores', function() {
//     it('should return an error message', function(done){
//       var newStore = new Store({
//         'name': 'Your store',
//         'description': 'The second best store.'
//       });
//       request(app)
//       .post('/api/stores')
//       .send(newStore)
//       .end(function(err, res){
//         assert.equal(res.statusCode, 400);
//         assert.equal(res.type, 'application/json');
//         assert.equal(
//           res.text,
//           '{"message":"You did not provide a JSON Web Token in the authorization header."}'
//         );
//         done();
//       });
//     });
//   });

//   describe('PUT /api/store/:id', function() {
//     it('should return an error', function(done) {
//       Store.findQ()
//       .then(function(result) {
//         request(app)
//         .put('/api/store/' + result[0]._id)
//         .send({name:'Testing Put Route'})
//         .end(function(err, res) {
//           assert.equal(res.statusCode, 400);
//           assert.equal(res.type, 'application/json');
//           assert.equal(
//             res.text,
//             '{"message":"You did not provide a JSON Web Token in the authorization header."}'
//           );
//           done();
//         });
//       });
//     });
//   });

//   describe('DELETE /api/store/:id', function() {
//     it('should return an error', function(done) {
//       Store.findQ()
//       .then(function(result) {
//         request(app)
//         .delete('/api/store/' + result[0]._id)
//         .end(function(err, res) {
//           assert.equal(res.statusCode, 400);
//           assert.equal(res.type, 'application/json');
//           assert.equal(
//             res.text,
//             '{"message":"You did not provide a JSON Web Token in the authorization header."}'
//           );
//           done();
//         });
//       });
//     });
//   });

// });
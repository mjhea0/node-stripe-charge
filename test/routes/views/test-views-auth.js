process.env.NODE_ENV = 'test';

var request = require('supertest');
var assert = require("assert");

var app = require('../../../src/server/app');
var helpers = require('../../helpers');


describe("auth.js Routes", function() {

  describe('GET auth/login', function(){
    it ('should return a view', function(done) {
      request(app)
        .get('/auth/login')
        .end(function (err, res) {
          assert.equal(res.statusCode, 200);
          assert.equal(res.status, 200);
          helpers.contains(res.text, '<h1>Login</h1>\n');
          done();
        });
    });
  });

});
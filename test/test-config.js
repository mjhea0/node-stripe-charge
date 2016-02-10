process.env.NODE_ENV = 'test';

var request = require('supertest');
var assert = require('assert');

var app = require('../src/server/app');


describe('app environment', function(){
  it ('should be "test"', function(done) {
    assert.equal(process.env.NODE_ENV, 'test');
    assert.notEqual(process.env.NODE_ENV, 'development');
    assert.notEqual(process.env.NODE_ENV, 'stage');
    done();
  });
});
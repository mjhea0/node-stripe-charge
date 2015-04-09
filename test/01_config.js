process.env.NODE_ENV = 'test';
var app = require('../server/app'),
    mongoose = require('mongoose'),
    assert = require("assert");


describe('app environment', function(){
  it ('should be "test"', function(done) {
    assert.equal(process.env.NODE_ENV, 'test');
    assert.notEqual(process.env.NODE_ENV, 'development');
    assert.notEqual(process.env.NODE_ENV, 'stage');
    done();
  });
});
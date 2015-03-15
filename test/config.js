process.env.NODE_ENV = 'test';
var app = require('../server/app');
// var request = require('supertest');
var should = require("should");
var mongoose = require('mongoose');


// console.log(process.env.NODE_ENV);

describe('app environment', function(){
  it ('should be "test"', function(done) {
    process.env.NODE_ENV.should.eql('test');
    done();
  });
});
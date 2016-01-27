var util = require('util');
var assert = require('assert');

function contains(actual, expected) {
  actual = actual || "";
  if(actual.indexOf(expected) === -1) {
    throw new assert.AssertionError({ message: "Expected:\n\n<"+actual+">\n\nto contain <"+expected+">"} );
  }
}

module.exports = {
  contains: contains
};


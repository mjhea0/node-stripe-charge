var config = {};

// mongo uri
config.mongoURI = {
  development: "mongodb://localhost/node-stripe-charge",
  test: "mongodb://localhost/node-stripe-charge-test",
  stage: process.env.MONGOLAB_URI
};

config.SALT_WORK_FACTOR = 10;

config.TOKEN_SECRET = process.env.TOKEN_SECRET || 'my-precious';

module.exports = config;
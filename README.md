## Node + Stripe + Express

[![Build Status](https://travis-ci.org/mjhea0/node-stripe-charge.svg?branch=master)](https://travis-ci.org/mjhea0/node-stripe-charge)

[![Coverage Status](https://coveralls.io/repos/mjhea0/node-stripe-charge/badge.svg)](https://coveralls.io/r/mjhea0/node-stripe-charge)

[![npm version](https://badge.fury.io/js/node-stripe-charge.svg)](http://badge.fury.io/js/node-stripe-charge)

This is a template for you to use in your own project for processing one-time Stripe charges. Follow the directions below to get started quickly.

## Quick Start

1. Clone - `git clone git@github.com:mjhea0/node-stripe-charge.git`
1. Install npm dependencies - `cd node-stripe-charge && npm install`
1. Install bower dependencies - `bower install`
1. Rename the *.env_sample* file to *.env* and update
1. Run `mongod` in a seperate terminal window
1. Run the app - `npm start` or `gulp`

> The database, if empty, is seeded with an admin user - username: *ad@min.com* / password: *admin*

## Development Workflow

1. Create feature branch
1. Develop/test locally (hack! hack! hack!)
1. Create PR, which triggers Travis CI
1. After tests pass, merge the PR
1. Tests run again on Travis CI
1. Once tests pass, code is deployed automatically to staging server on Heroku (WIP)

## Tests

Without code coverage:

```sh
$ gulp test
```

With code coverage:

```sh
$ istanbul cover _mocha -- -R spec
```

## Changelog

1. 04/23/2015 - major refactor
1. 03/11/2015 - updated to Express 4.x

## Screenshots

### Main Page

![main](https://raw.github.com/mjhea0/node-stripe-charge/master/images/main.png)

### Charge Page

![charge](https://raw.github.com/mjhea0/node-stripe-charge/master/images/charge.png)

### Successful Charge

![success](https://raw.github.com/mjhea0/node-stripe-charge/master/images/success.png)

### Admin Page

![admin](https://raw.github.com/mjhea0/node-stripe-charge/master/images/admin.png)

## Node + Stripe + Express

[![Build Status](https://travis-ci.org/mjhea0/node-stripe-charge.svg?branch=master)](https://travis-ci.org/mjhea0/node-stripe-charge)

[![Coverage Status](https://coveralls.io/repos/github/mjhea0/node-stripe-charge/badge.svg?branch=master)](https://coveralls.io/github/mjhea0/node-stripe-charge?branch=master)

This is a template for you to use on your own projects for processing one-time Stripe charges. Follow the directions below to get started.

The back-end API includes:

1. User auth
1. Stripe integration
1. Testing via Mocha and Chai as well as Istanbul for code coverage

## Quick Start

1. Clone and install dependencies
1. Update the config:
  - Rename the *.env_sample* file to *.env* and update
  - Update the Mongo URI in */src/_config.js* (if necessary)
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
$ npm test
```

With code coverage:

```sh
$ npm cov
```

## Changelog

1. 02/09/2016 - refactored passport, tests, error handlers, client-side javascript (view [commit](https://github.com/mjhea0/node-stripe-charge/commit/f32c6eb731dbf14b194ac07795671931100139b4))
1. 04/23/2015 - major refactor
1. 03/11/2015 - updated to Express 4.x

## JSON API Documentation

Admin required for all routes!

### User

- GET `/api/v1/users` - get all users
- GET `/api/v1/user/:id` - get user
- POST `/api/v1/users` - create user
- PUT `/api/v1/user/:id` - update user
- DELETE `/api/v1/user/:id` - delete user (WIP)

### Item (todo)

- GET `/items` - get all items
- GET `/item/:id` - get item
- POST `/items` - create item
- PUT `/item/:id` - update item
- DELETE `/item/:id` - delete item

### Store (todo)

- GET `/stores` - get all stores
- GET `/store/:id` - get store
- POST `/stores` - create store
- PUT `/store/:id` - update store
- DELETE `/store/:id` - delete store

### Plan (todo)

- GET `/plans` - get all plans
- GET `/plan/:id` - get plan
- POST `/plans` - create plan
- PUT `/plan/:id` - update plan
- DELETE `/plan/:id` - delete plan

## Screenshots

### Main Page

![main](https://raw.github.com/mjhea0/node-stripe-charge/master/images/main.png)

### Charge Page

![charge](https://raw.github.com/mjhea0/node-stripe-charge/master/images/charge.png)

### Successful Charge

![success](https://raw.github.com/mjhea0/node-stripe-charge/master/images/success.png)

### Admin Page

![admin](https://raw.github.com/mjhea0/node-stripe-charge/master/images/admin.png)

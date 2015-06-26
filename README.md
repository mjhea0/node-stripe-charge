## Node + Stripe + Express

[![Build Status](https://travis-ci.org/mjhea0/node-stripe-charge.svg?branch=master)](https://travis-ci.org/mjhea0/node-stripe-charge)

[![Coverage Status](https://coveralls.io/repos/mjhea0/node-stripe-charge/badge.svg)](https://coveralls.io/r/mjhea0/node-stripe-charge)

[![npm version](https://badge.fury.io/js/node-stripe-charge.svg)](http://badge.fury.io/js/node-stripe-charge)

This is a template for you to use in your own project for processing one-time Stripe charges. Follow the directions below to get started quickly. You will obviously want to customize this template to meet your needs.

## Quick Start

1. Download - `git clone git@github.com:mjhea0/node-stripe-charge.git`
1. Install the dependencies - `cd node-stripe-charge && npm install`
1. Add Stripe Keys as env variables (see *_config.js*)
1. Run `mongod` in a seperate terminal window
1. Run the app: `npm start` or `gulp`

> The database is seeded with an admin user - username: *ad@min.com* / password: *admin*

## Tests

1. Run - `gulp test` and/or `istanbul cover _mocha -- -R spec`

## Todo

1. Refactor passport - turn into API
1. Update user profile page.
1. Update admin page. Add charts, graphs, sortable table(s), etc.
1. Add more tests. Increase code coverage.
1. Add GUI for admins to add/update/delete products.
1. Add transaction emails via mailgun.

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

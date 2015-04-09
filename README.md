_## Node + Stripe + Express

[![Build Status](https://travis-ci.org/mjhea0/node-stripe-charge.svg?branch=master)](https://travis-ci.org/mjhea0/node-stripe-charge)

[![npm version](https://badge.fury.io/js/node-stripe-charge.svg)](http://badge.fury.io/js/node-stripe-charge)

This is a template for you to use in your own project for processing one-time Stripe charges. Follow the directions below to get started quickly. You will obviously want to customize this template to meet your needs. *The user login is only for admins*.

## Quick Start

1. Download - `npm install node-stripe-template`
1. Install the dependencies - `cd node-stripe-template && npm install`
1. Add Stripe Keys to env variables (see *_config.js*)
1. Add your `PublishableKey` to *main.js*
1. Run `mongod` in a seperate terminal window
1. Run the app: `npm start` or `gulp`

> The database is seeded with an admin user - username: *ad@min.com* / password: *admin*

## Tests

1. Run - `gulp test` and/or `make coverage`

## Todo

1. Add more tests
1. Update admin page. Add charts, graphs, sortable table(s), etc.
1. Better error handling
1. Coveralls
1. API - users, products (WIP)
1. Add more products. Add ability for admins to add projects.
1. Mailgun transaction emails.

## Changelog

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

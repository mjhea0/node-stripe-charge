## Node + Stripe + Express

Travis sticker

This is a template for you to use in your own project for processing one-time Stripe charges. Follow the directions below to get started quickly. You will obviously want to customize this template to meet your needs. *The user login is only for admins*.

## Quick Start

1. Clone: `git clone git@github.com:mjhea0/node-stripe-template.git`
1. Install the dependencies: `cd node-stripe-template && npm install`
1. Rename *server/_config_sample.js* to *server/_config.js* and add your Stripe Keys
1. Add your `PublishableKey` to *main.js*
1. Run `mongod` in a seperate terminal window
1. Run the app: `npm start` or `gulp`

> The database is seeded with an admin user - username: *ad@min.com* / password: *admin*

## Tests

1. Run - `make test` and/or `make coverage`

## Todo

1. Add more tests
2. Update admin page. Add charts, graphs, sortable table(s), trim time from dates, etc.
3. Better error handling

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

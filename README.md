## Node + Stripe + Express

This is a template for you to use in your own project for processing one time charges. Follow the directions below for getting started quickly. You will obviously want to customize this template to meet your needs. 

## quick start

1. Clone:
```sh
$ git clone git@github.com:mjhea0/node-stripe-template.git your_app
```

2. Install dependencies:
```sh
$ cd your_app
$ npm install
```

3. Rename "config_sample.js" to "config.js" and add your Stripe Keys

4. Add your PublishableKey to "main.js"

5. Rename "users_sample.js" to "users.js" and update the admin user info

5. Make sure to add both "config.js" and "users.js" to your ".gitignore" file

7. Run:
```sh
$ node app
```

8. Once you get everything working, make sure to update the links within the admin page, depending upon if you're using the test account or live account.

## tests

1. Run `make test` and observe the results on the command line. (not ready yet)


## to do

1. unit- FREAKING -tests
2. update admin page. add charts, graphs, sortable table, trim time from dates ..
3. add login error messaging

## screenshots

### main page

![main](https://raw.github.com/mjhea0/node-stripe-charge/master/screenshots/main.png)

### charge page

![charge](https://raw.github.com/mjhea0/node-stripe-charge/master/screenshots/charge.png)

### successful charge

![success](https://raw.github.com/mjhea0/node-stripe-charge/master/screenshots/success.png)

### admin page

![admin](https://raw.github.com/mjhea0/node-stripe-charge/master/screenshots/main.png)

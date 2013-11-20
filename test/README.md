# Mocha Testing Skeleton

This repo demonstrates how to run mocha + expect.js unit tests in the browser
(or headlessly), with tests written in BDD (Behavior Driven Development) style.

Dependencies:
- [mocha](http://visionmedia.github.io/mocha/) - a JavaScript test framework
  for running tests on Node.js and the browser
- [expect.js](https://github.com/LearnBoost/expect.js/) - a small BDD-style
  assertion library
- [mocha-phantomjs](https://github.com/metaskills/mocha-phantomjs) - a 
  PhantomJS test runner for running browser tests headlessly

Included files:
- `main.js` - the code under test
- `test/index.html` - an HTML page that sets up the test infrastructure and enables you to run the tests.
- `test/tests.js` - the mocha test suite. The functions "describe()" and "it()" and "afterEach()" are part of mocha; the "expect()" functions are assertion functions that come from expect.js.

Based upon [this](https://github.com/evangoer/mocha-unit-testing) repo. Altered to meet my needs.

## Installing

1. Install Node.js and npm from [NodeJS.org](http://nodejs.org/). 
2. Use git to clone this repo on your local machine:
```sh
$ git clone https://github.com/mjhea0/mocha-testing-skeleton.git
```

3. Enter the repo directory and type `make install`. This installs the dependencies listed above.

## Running the tests manually from a browser

1. Open the `test/index.html` file in a browser. This displays a test page that shows two tests passing.
2. Simply refresh the page to run the test suite again.

## Running the tests headlessly using PhantomJS

1. Run `make test` and observe the results on the command line.

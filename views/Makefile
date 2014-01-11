TESTS = test/*.js
ISTANBUL = cover _mocha -- -R spec

test: 
		@NODE_ENV=test ./node_modules/.bin/mocha \
				$(TESTS)

.PHONY: test

coverage:
		@NODE_ENV=test ./node_modules/.bin/istanbul \
				$(ISTANBUL)

.PHONY: coverage

ISTANBUL = cover _mocha -- -R spec

coverage:
		@NODE_ENV=test ./node_modules/.bin/istanbul \
				$(ISTANBUL)

.PHONY: coverage

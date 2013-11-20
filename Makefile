BIN = node_modules/.bin

install:
	npm install

test:
	$(BIN)/mocha-phantomjs test/index.html


.PHONY: start test test-headless

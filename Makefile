install:
	npm ci

test:
	npm test

test-coverage:
	npm run test:coverage

test-watch:
	npm run test:watch

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .

test-json:
	node bin/gendiff.js __fixtures__/file1.json __fixtures__/file2.json

test-yaml:
	node bin/gendiff.js __fixtures__/file1.yml __fixtures__/file2.yml

gendiff:
	node bin/gendiff.js $(ARGS)

help:
	node bin/gendiff.js -h

version:
	node bin/gendiff.js -V

.PHONY: install test test-coverage test-watch lint lint-fix test-json test-yaml gendiff help version
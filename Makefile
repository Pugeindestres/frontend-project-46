install:
	npm ci

build:
	npm run build

test:
	npm test

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .

gendiff:
	node bin/gendiff.js

help:
	node bin/gendiff.js -h

version:
	node bin/gendiff.js -V
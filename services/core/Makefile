SHELL := /bin/bash

REV=$(shell git rev-parse --verify HEAD)
DATE=$(shell date +%Y-%m-%d)
CURR_DIR=$(shell pwd)

.PHONY:

all: test build build-container

ts-node: clean .PHONY
	./node_modules/.bin/ts-node src/index.ts

test: clean .PHONY
	./node_modules/.bin/jest

test-watch: .PHONY
	./node_modules/.bin/jest --watch

build: clean .PHONY
	./node_modules/.bin/tsc

clean: .PHONY
	./node_modules/.bin/rimraf dist

push-container: tag-container .PHONY
	docker push gcr.io/jargon/core:build-$(DATE)-$(REV)

tag-container: .PHONY
	docker tag core:build-$(DATE)-$(REV) gcr.io/jargon/core:build-$(DATE)-$(REV)

build-container: build .PHONY
	docker build -t core:build-$(DATE)-$(REV) .

apply-container: .PHONY
	sed 's/__REPLACE_WITH_TAG__/'"build-$(DATE)-$(REV)"'/g' ./kube.yaml | kubectl apply -f - 

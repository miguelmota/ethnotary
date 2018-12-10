all: build

.PHONY: build
build:
	@truffle migrate

.PHONY: build/client
build/client:
	@npm run build:client

.PHONY: start/testrpc
start/testrpc:
	@ganache-cli -m "dress rate excess hurry drastic saddle notice yard urban fat army sort"

.PHONY: deploy
deploy:
	@truffle deploy

.PHONY: test
test:
	@truffle test

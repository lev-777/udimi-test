init: init-ci frontend-ready

init-ci: docker-down-clear \
	frontend-clear \
	docker-pull docker-build docker-up \
	frontend-init

up: docker-up
down: docker-down
restart: down up

docker-down:
	docker-compose down --remove-orphans

docker-down-clear:
	docker-compose down -v --remove-orphans

frontend-ready:
	docker run --rm -v ${PWD}/frontend:/app -w /app alpine touch .ready

docker-up:
	docker-compose up -d

docker-pull:
	docker-compose pull

docker-build:
	docker-compose build --pull

frontend-clear:
	docker run --rm -v ${PWD}/frontend:/app -w /app alpine sh -c 'rm -rf .ready'

frontend-init: frontend-yarn-install

frontend-yarn-install:
	docker-compose run --rm node-cli yarn install

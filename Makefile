install:
	(cd ui && npm install)
	(cd api && npm install)
	(cd e2e && npm install)

docker:
	docker compose up

populate:
	(cd api && npm run populate)

start_ui:
	(cd ui && npm start)

start_api:
	(cd api && npm start)

test:
	(cd e2e && npm run test)

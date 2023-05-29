build:
	docker compose build
	docker compose run --rm seeds_view npm install
	docker compose run --rm seeds_api rails db:create
	docker compose run --rm seeds_api rails db:migrate
	docker compose run --rm seeds_api rails db:seed_fu

rebuild:
	docker compose build --no-cache
	docker compose run --rm seeds_view npm install
	docker compose run --rm seeds_api rails db:create
	docker compose run --rm seeds_api rails db:migrate
	docker compose run --rm seeds_api rails db:seed_fu

db:
	docker compose up seeds_db -d
	docker compose run --rm seeds_api rails db:create
	docker compose run --rm seeds_api rails db:migrate
	docker compose run --rm seeds_api rails db:seed_fu

db-export:
	docker compose up hasura -d
	sleep 15
	docker compose exec hasura hasura metadata export
	docker compose exec hasura hasura migrate create "auto" --from-server --database-name default
	docker compose exec hasura hasura migrate status --database-name default
	docker compose down
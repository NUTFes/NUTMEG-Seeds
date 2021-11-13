build:
	docker compose build
	docker compose run --rm seeds_view npm install
	docker compose run --rm seeds_api rails db:create
	docker compose run --rm seeds_api rails db:migrate
	docker compose run --rm seeds_api rails db:seed_fu

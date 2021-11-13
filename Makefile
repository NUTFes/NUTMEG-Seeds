build:
	docker compose build
	docker compose run --rm seeds_view npm install

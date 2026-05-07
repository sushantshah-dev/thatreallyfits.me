.PHONY: install test run migrate-init migrate-upgrade docker-up docker-down

install:
	python -m pip install --upgrade pip
	pip install -r requirements.txt

test:
	pytest

lint:
	python -m pip install --upgrade pip
	pip install black isort ruff mypy

	# format checkers
	black --check .
	isort --check-only .
	ruff check .
	mypy app tests || true

run:
	python manage.py

migrate-init:
	flask db init
	flask db migrate -m "initial schema"
	flask db upgrade

migrate-upgrade:
	flask db upgrade

docker-up:
	docker compose up --build -d

docker-down:
	docker compose down

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
	python -m flask db init
	python -m flask db migrate -m "initial schema"
	python -m flask db upgrade

migrate-upgrade:
	python -m flask db upgrade

docker-up:
	docker compose up --build -d

docker-down:
	docker compose down

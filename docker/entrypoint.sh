#!/usr/bin/env bash
set -e

python scripts/wait_for_db.py

if [ ! -d migrations ]; then
  echo "migrations directory not found — initializing and auto-generating migrations"
  flask db init || true
  flask db migrate -m "autogen: initial migration" || true
else
  echo "migrations directory found — attempting autogenerate"
  flask db migrate -m "autogen: $(date -u +%Y%m%dT%H%M%SZ)" || true
fi

echo "applying database migrations"
flask db upgrade || true

exec "$@"

import os

import jwt
from flask import Flask, g, request

from app.config import CONFIG_BY_NAME
from app.extensions import db, migrate
from app.models import *  # noqa: F401, F403
from app.routes import app_bp, auth_bp, health_bp, home_bp
from app.vite import register_vite_helpers


def create_app(config_name: str | None = None) -> Flask:
    env_config = os.getenv("FLASK_ENV")
    selected_config: str = config_name or env_config or "development"
    app = Flask(__name__)
    app.config.from_object(CONFIG_BY_NAME[selected_config])

    if selected_config == "production" and not app.config.get(
        "SQLALCHEMY_DATABASE_URI"
    ):
        raise RuntimeError("DATABASE_URL is required in production")

    db.init_app(app)
    migrate.init_app(app, db)
    register_vite_helpers(app)

    app.register_blueprint(home_bp)
    app.register_blueprint(app_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(health_bp)

    @app.before_request
    def load_current_user():
        g.current_user = None

        token = None

        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header.removeprefix("Bearer ").strip()

        if token is None:
            token = request.cookies.get("auth_token")

        if not token:
            return None

        try:
            payload = jwt.decode(
                token,
                app.config["SECRET_KEY"],
                algorithms=["HS256"],
            )
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None

        user_id = payload.get("user_id")
        if user_id is None:
            return None

        from app.models import User

        user = User.query.get(user_id)
        g.current_user = user
        return None

    return app

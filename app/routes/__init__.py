from app.routes.app import app_bp
from app.routes.auth import auth_bp
from app.routes.health import health_bp
from app.routes.home import home_bp

__all__ = ["auth_bp", "app_bp", "health_bp", "home_bp"]

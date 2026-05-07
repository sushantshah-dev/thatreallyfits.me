from flask import Blueprint, current_app

home_bp = Blueprint("home", __name__)


@home_bp.get("/")
def index():
    return current_app.send_static_file("react/index.html"), 200
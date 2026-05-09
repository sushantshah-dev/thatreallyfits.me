from flask import Blueprint, current_app

from app.decorators import login_required

app_bp = Blueprint("app_page", __name__)


@app_bp.get("/app")
@login_required
def app_page():
    return current_app.send_static_file("react/app.html"), 200

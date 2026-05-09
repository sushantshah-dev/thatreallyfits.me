import datetime
import os

import jwt
import sqlalchemy.exc
from flask import Blueprint, current_app, make_response, redirect, request, url_for

from app.extensions import db
from app.models import User

auth_bp = Blueprint("auth", __name__)


@auth_bp.get("/login")
def login():
    return current_app.send_static_file("react/auth.html"), 200


@auth_bp.get("/signup")
def signup():
    return current_app.send_static_file("react/auth.html"), 200


@auth_bp.post("/logout")
@auth_bp.get("/logout")
def logout():
    response = make_response(redirect(url_for("auth.login")), 302)
    response.delete_cookie("auth_token")
    return response


@auth_bp.post("/api/login")
def api_login():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            token = jwt.encode(
                {
                    "user_id": user.id,
                    "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24),
                },
                current_app.config["SECRET_KEY"],
                algorithm="HS256",
            )
            user.last_login_at = datetime.datetime.utcnow()
            db.session.commit()
            response = make_response({"token": token}, 200)
            response.set_cookie(
                "auth_token",
                token,
                httponly=True,
                samesite="Lax",
                secure=os.getenv("FLASK_ENV") == "production",
                max_age=60 * 60 * 24,
            )
            return response
        else:
            return {"error": "Invalid email or password"}, 401
    except sqlalchemy.exc.SQLAlchemyError:
        return {"error": "Database error"}, 500
    except Exception:
        return {"error": "An unexpected error occurred"}, 500


@auth_bp.post("/api/signup")
def api_signup():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")
        full_name = data.get("full_name")

        if User.query.filter_by(email=email).first():
            return {"error": "Email already registered"}, 400

        user = User(email=email, full_name=full_name)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()

        token = jwt.encode(
            {
                "user_id": user.id,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24),
            },
            current_app.config["SECRET_KEY"],
            algorithm="HS256",
        )
        response = make_response({"token": token}, 201)
        response.set_cookie(
            "auth_token",
            token,
            httponly=True,
            samesite="Lax",
            secure=os.getenv("FLASK_ENV") == "production",
            max_age=60 * 60 * 24,
        )
        return response
    except sqlalchemy.exc.SQLAlchemyError:
        return {"error": "Database error"}, 500
    except Exception:
        return {"error": "An unexpected error occurred"}, 500

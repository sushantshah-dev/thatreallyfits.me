from functools import wraps

from flask import g, redirect, request, url_for


def login_required(view):
    @wraps(view)
    def wrapped_view(*args, **kwargs):
        if g.current_user is None:
            next_path = request.full_path if request.query_string else request.path
            return redirect(url_for("auth.login", next=next_path))

        return view(*args, **kwargs)

    return wrapped_view

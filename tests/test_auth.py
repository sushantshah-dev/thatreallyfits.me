def test_app_redirects_anonymous_users(client):
    response = client.get("/app", follow_redirects=False)

    assert response.status_code == 302
    assert response.headers["Location"] == "/login?next=/app"


def test_logout_clears_auth_cookie(client):
    response = client.get("/logout", follow_redirects=False)

    assert response.status_code == 302
    assert response.headers["Location"] == "/login"
    assert "auth_token=;" in response.headers["Set-Cookie"]

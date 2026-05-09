def test_root_endpoint(client):
    response = client.get("/")

    assert response.status_code == 200
    assert response.mimetype == "text/html"
    body = response.get_data(as_text=True)
    assert '<div id="root"></div>' in body

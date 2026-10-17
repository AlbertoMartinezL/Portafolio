from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health():
    assert client.get("/api/health").json() == {"status": "ok"}


def test_profile_skills_experience():
    for path in ("/api/profile", "/api/skills", "/api/experience", "/api/education"):
        assert client.get(path).status_code == 200


def test_projects_and_filters():
    all_projects = client.get("/api/projects").json()
    assert len(all_projects) > 0
    featured = client.get("/api/projects", params={"featured": True}).json()
    assert all(p["featured"] for p in featured)
    slug = all_projects[0]["slug"]
    assert client.get(f"/api/projects/{slug}").status_code == 200
    assert client.get("/api/projects/no-existe").status_code == 404


def test_contact_validation():
    ok = client.post(
        "/api/contact",
        json={"name": "Ana", "email": "ana@test.com", "message": "Hola, me interesa tu perfil."},
    )
    assert ok.status_code == 200
    bad = client.post("/api/contact", json={"name": "A", "email": "no-email", "message": "x"})
    assert bad.status_code == 422

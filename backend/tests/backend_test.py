"""Backend tests for Dhanusha Production API - leads and settings."""
import os
import time
import requests
import pytest

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://visual-create-40.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------------- Leads ----------------
class TestLeads:
    def test_create_lead(self, client):
        payload = {
            "name": "TEST_Alice",
            "email": "test_alice@example.com",
            "phone": "9999999999",
            "service": "Podcast",
            "message": "TEST message please ignore",
        }
        r = client.post(f"{API}/leads", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert "created_at" in data
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["service"] == "Podcast"

    def test_list_leads_recent_first(self, client):
        # create two leads with slight delay
        p1 = {"name": "TEST_First", "email": "t1@example.com", "phone": "1111111111",
              "service": "Reel", "message": "first"}
        r1 = client.post(f"{API}/leads", json=p1)
        assert r1.status_code == 200
        time.sleep(1.1)
        p2 = {"name": "TEST_Second", "email": "t2@example.com", "phone": "2222222222",
              "service": "Reel", "message": "second"}
        r2 = client.post(f"{API}/leads", json=p2)
        assert r2.status_code == 200

        r = client.get(f"{API}/leads")
        assert r.status_code == 200
        leads = r.json()
        assert isinstance(leads, list)
        assert len(leads) >= 2
        # Most recent first
        emails = [l["email"] for l in leads]
        idx1 = emails.index("t1@example.com")
        idx2 = emails.index("t2@example.com")
        assert idx2 < idx1, "Newer lead should come first"

    def test_create_lead_validation(self, client):
        r = client.post(f"{API}/leads", json={})
        assert r.status_code == 422


# ---------------- Settings ----------------
class TestSettings:
    def test_get_settings_default(self, client):
        r = client.get(f"{API}/settings")
        assert r.status_code == 200
        data = r.json()
        assert "show_testimonials" in data
        assert isinstance(data["show_testimonials"], bool)

    def test_toggle_settings_persists(self, client):
        # Set true
        r = client.put(f"{API}/settings", json={"show_testimonials": True})
        assert r.status_code == 200
        assert r.json()["show_testimonials"] is True

        r = client.get(f"{API}/settings")
        assert r.status_code == 200
        assert r.json()["show_testimonials"] is True

        # Set false
        r = client.put(f"{API}/settings", json={"show_testimonials": False})
        assert r.status_code == 200
        assert r.json()["show_testimonials"] is False

        r = client.get(f"{API}/settings")
        assert r.status_code == 200
        assert r.json()["show_testimonials"] is False

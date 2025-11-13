# main.py  – FastAPI backend for Blarney app

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import select, text
from datetime import datetime

# reuse the DB engine & Session from db.py
from db import SessionLocal, POI, engine

app = FastAPI(title="Blarney API (MySQL)")


# ---------- CORS ----------

# Allow local web + Expo during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5173",
        "http://localhost:5173",
        "http://localhost:8081",
        "http://localhost:8082",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------- Models for responses ----------

class HomeStatus(BaseModel):
    tickets_url: str
    castle_queue_wait_mins: int
    car_park_status: str
    closing_time: str
    last_admission: str


# ---------- Basic routes ----------

@app.get("/")
def root():
    return {
        "ok": True,
        "message": "Blarney API running",
        "endpoints": ["/api/ping", "/api/home", "/api/poi", "/docs"],
    }


@app.get("/api/ping")
def ping():
    """Simple health check that also touches the DB."""
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
    return {"ok": True, "db": "mysql connected"}


# ---------- HOME STATUS (used by app) ----------

@app.get("/api/home", response_model=HomeStatus)
def get_home_status():
    """
    Return latest visitor info from the site_status table.
    Falls back to safe defaults if table is empty.
    """
    query = text(
        """
        SELECT tickets_url,
               castle_queue_wait_mins,
               car_park_status,
               closing_time,
               last_admission
        FROM site_status
        ORDER BY updated_at DESC
        LIMIT 1
        """
    )

    with engine.connect() as conn:
        row = conn.execute(query).mappings().first()

    if not row:
        # fallback defaults if DB is empty
        return HomeStatus(
            tickets_url="https://blarneycastle.retailint-tickets.com/Event/GENERALADM",
            castle_queue_wait_mins=5,
            car_park_status="Spaces Available",
            closing_time="5:00pm",
            last_admission="4:00pm",
        )

    return HomeStatus(**row)


# ---------- POI ENDPOINT (unchanged) ----------

@app.get("/api/poi")
def list_poi():
    with SessionLocal() as db:
        rows = db.execute(select(POI)).scalars().all()
        return [
            dict(id=r.id, name=r.name, lat=r.lat, lng=r.lng)
            for r in rows
        ]


# (Optional) keep /api/status as a simple alias if you want
@app.get("/api/status")
def status():
    hs = get_home_status()
    return {
        "queue_wait": hs.castle_queue_wait_mins,
        "car_park_status": hs.car_park_status,
        "closing_time": hs.closing_time,
        "last_admission": hs.last_admission,
        "updated_at": datetime.utcnow().isoformat() + "Z",
    }

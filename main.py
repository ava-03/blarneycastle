# https://fastapi.tiangolo.com/tutorial/cors/#use-corsmiddleware
# https://docs.sqlalchemy.org/en/20/orm/queryguide/select.html

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import select
from db import SessionLocal, POI
from datetime import datetime

app = FastAPI(title="Blarney API (MySQL)")

# CORS - allow local web + expo web
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5173",
        "http://localhost:5173",
        "http://localhost:8081",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- model used by /api/home ----------

class HomeStatus(BaseModel):
    tickets_url: str
    castle_queue_wait_mins: int
    car_park_status: str
    closing_time: str
    last_admission: str


# ---------- index & health ----------

@app.get("/")
def home_root():
    """Quick index showing available endpoints."""
    return {
        "ok": True,
        "message": "Blarney API running",
        "endpoints": ["/api/ping", "/api/status", "/api/home", "/api/poi", "/docs"],
    }


@app.get("/api/ping")
def ping():
    """Used by the app to confirm backend connectivity."""
    return {"ok": True, "db": "mysql connected"}


# ---------- status & home tiles ----------

@app.get("/api/status")
def status():
    """Static placeholder values for now."""
    return {
        "queue_wait": 5,
        "car_park_status": "Spaces Available",
        "closing_time": "5:00pm",
        "last_admission": "4:00pm",
        "updated_at": datetime.utcnow().isoformat() + "Z",
    }


@app.get("/api/home", response_model=HomeStatus)
def get_home():
    """
    Adapter endpoint for the React Native app.
    Reuses /api/status data and reshapes it into what the app expects.
    """
    s = status()
    return HomeStatus(
        tickets_url="https://blarneycastle.retailint-tickets.com/Event/GENERALADM",
        castle_queue_wait_mins=s["queue_wait"],
        car_park_status=s["car_park_status"],
        closing_time=s["closing_time"],
        last_admission=s["last_admission"],
    )


# ---------- POI endpoint ----------

@app.get("/api/poi")
def list_poi():
    """Returns list of POI objects from MySQL using SQLAlchemy ORM."""
    with SessionLocal() as db:
        rows = db.execute(select(POI)).scalars().all()
        return [dict(id=r.id, name=r.name, lat=r.lat, lng=r.lng) for r in rows]

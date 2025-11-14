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
        "http://localhost:8082",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home_root():
    return {
        "ok": True,
        "message": "Blarney API running",
        "endpoints": ["/api/ping", "/api/status", "/api/home", "/api/poi", "/docs"],
    }

@app.get("/api/ping")
def ping():
    return {"ok": True, "db": "mysql connected"}


# ---------- existing status endpoint ----------

@app.get("/api/status")
def status():
    # static demo values for now
    return {
        "queue_wait": 42,
        "car_park_status": "Spaces Available",
        "closing_time": "18:00",
        "last_admission": "17:00",
        "updated_at": datetime.utcnow().isoformat() + "Z",
    }


# ---------- NEW: /api/home for the app ----------

class HomeStatus(BaseModel):
    tickets_url: str
    castle_queue_wait_mins: int
    car_park_status: str
    closing_time: str
    last_admission: str


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


# ---------- POI endpoint (unchanged) ----------

@app.get("/api/poi")
def list_poi():
    with SessionLocal() as db:
        rows = db.execute(select(POI)).scalars().all()
        return [
            dict(id=r.id, name=r.name, lat=r.lat, lng=r.lng)
            for r in rows
        ]

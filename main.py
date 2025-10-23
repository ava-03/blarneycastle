from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from db import SessionLocal, POI
from datetime import datetime

app = FastAPI(title="Blarney API (MySQL)")

# CORS: allow local web + expo web (safe for dev)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5173",
        "http://localhost:5173",
        "http://localhost:8081",   # expo web (if you try it)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"ok": True, "message": "Blarney API running", "endpoints": ["/api/ping", "/api/status", "/api/poi", "/docs"]}

@app.get("/api/ping")
def ping():
    return {"ok": True, "db": "mysql connected"}

# ✅ NEW: one place for your "home tiles" data
@app.get("/api/status")
def status():
    # For now, static demo values (can be made DB-driven later)
    return {
        "queue_wait": 42,                       # minutes
        "car_park_status": "Spaces Available",
        "closing_time": "18:00",
        "last_admission": "17:00",
        "updated_at": datetime.utcnow().isoformat() + "Z",
    }

# (POI endpoints unchanged)
@app.get("/api/poi")
def list_poi():
    with SessionLocal() as db:
        rows = db.execute(select(POI)).scalars().all()
        return [dict(id=r.id, name=r.name, lat=r.lat, lng=r.lng) for r in rows]

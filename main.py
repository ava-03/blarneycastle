# https://fastapi.tiangolo.com/tutorial/cors/#use-corsmiddleware
# https://docs.sqlalchemy.org/en/20/orm/queryguide/select.html

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
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

@app.get("/")
# Quick API index route showing available endpoints
def home():
    return {"ok": True, "message": "Blarney API running", "endpoints": ["/api/ping", "/api/status", "/api/poi", "/docs"]}

@app.get("/api/ping")
 # Used by the app to confirm backend connectivity
def ping():
    return {"ok": True, "db": "mysql connected"}

#  one place for "home tiles" data
@app.get("/api/status")
# Static placeholder values
def status():
    #  static demo values 
    return {
        "queue_wait": 42,                       
        "car_park_status": "Spaces Available",
        "closing_time": "18:00",
        "last_admission": "17:00",
        "updated_at": datetime.utcnow().isoformat() + "Z",
    }

# (POI endpoints)
@app.get("/api/poi")
# Returns list of POI objects from MySQL using SQLAlchemy ORM
def list_poi():
    with SessionLocal() as db:
        rows = db.execute(select(POI)).scalars().all()
        return [dict(id=r.id, name=r.name, lat=r.lat, lng=r.lng) for r in rows]

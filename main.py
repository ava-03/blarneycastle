from fastapi import FastAPI
from sqlalchemy import select
from db import SessionLocal, POI

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Blarney API (MySQL)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5173",
        "http://localhost:5173",
        "https://*.vercel.app",   # allow your deployed frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app = FastAPI(title="Blarney API (MySQL)")

@app.get("/")
def home():
    return {"ok": True, "message": "Blarney API running", "endpoints": ["/api/ping", "/api/poi", "/docs"]}


@app.get("/api/ping")
def ping():
    return {"ok": True, "db": "mysql connected"}

@app.get("/api/poi")
def list_poi():
    with SessionLocal() as db:
        rows = db.execute(select(POI)).scalars().all()
        return [dict(id=r.id, name=r.name, lat=r.lat, lng=r.lng) for r in rows]

@app.post("/api/poi")
def add_poi(name: str, lat: float, lng: float):
    with SessionLocal() as db:
        row = POI(name=name, lat=lat, lng=lng)
        db.add(row); db.commit(); db.refresh(row)
        return dict(id=row.id, name=row.name, lat=row.lat, lng=row.lng)

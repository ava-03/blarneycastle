from fastapi import FastAPI
from sqlalchemy import select
from db import SessionLocal, POI

app = FastAPI(title="Blarney API (MySQL)")

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

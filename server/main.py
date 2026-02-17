from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import select

from db import SessionLocal, POI, SiteStatus

app = FastAPI(title="Blarney API (MySQL)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5173",
        "http://localhost:5173",
        "http://localhost:8081",
        "http://localhost:8082",
        "https://blarneycastle.onrender.com",
    ],

    # https://xkvldos-avabis-8081.exp.direct
    allow_origin_regex=r"^https://.*\.exp\.direct$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class HomeStatus(BaseModel):
    tickets_url: str
    castle_queue_wait_mins: int
    car_park_status: str
    closing_time: str
    last_admission: str

@app.get("/")
def home_root():
    return {"ok": True, "message": "Blarney API running"}

@app.get("/api/ping")
def ping():
    return {"ok": True}

@app.get("/api/home", response_model=HomeStatus)
def get_home():
    with SessionLocal() as db:
        row = (
            db.execute(select(SiteStatus).order_by(SiteStatus.id.desc()).limit(1))
            .scalars()
            .first()
        )

        if not row:
            return HomeStatus(
                tickets_url="https://blarneycastle.retailint-tickets.com/Event/GENERALADM",
                castle_queue_wait_mins=0,
                car_park_status="Unknown",
                closing_time="N/A",
                last_admission="N/A",
            )

        return HomeStatus(
            tickets_url=row.tickets_url,
            castle_queue_wait_mins=row.castle_queue_wait_mins,
            car_park_status=row.car_park_status,
            closing_time=row.closing_time,
            last_admission=row.last_admission,
        )

@app.get("/api/poi")
def list_poi():
    with SessionLocal() as db:
        rows = db.execute(select(POI)).scalars().all()
        return [dict(id=r.id, name=r.name, lat=r.lat, lng=r.lng) for r in rows]

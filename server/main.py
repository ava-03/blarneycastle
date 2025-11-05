"""
main.py — FastAPI backend for Blarney Castle Visitor App
---------------------------------------------------------
Routes:
  • /api/ping  — health check (verifies DB connectivity)
  • /api/home  — returns live info from the site_status table
---------------------------------------------------------
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")
DB_HOST = os.getenv("DB_HOST", "127.0.0.1")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_NAME = os.getenv("DB_NAME", "blarney")

# CORS: allow Expo Web and common dev hosts (override via .env CORS_ORIGINS)
DEFAULT_CORS = [
    "http://localhost:8082",
    "http://127.0.0.1:8082",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
CORS_ORIGINS = os.getenv("CORS_ORIGINS")
ALLOW_ORIGINS = (
    [o.strip() for o in CORS_ORIGINS.split(",")] if CORS_ORIGINS else DEFAULT_CORS
)

# SQLAlchemy connection string (PyMySQL)
DATABASE_URL = (
    f"mysql+pymysql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    "?charset=utf8mb4"
)

# Create SQLAlchemy engine
engine = create_engine(DATABASE_URL, pool_pre_ping=True)

# Initialize FastAPI
app = FastAPI(title="Blarney Castle API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOW_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Response model
class HomeStatus(BaseModel):
    tickets_url: str
    castle_queue_wait_mins: int
    car_park_status: str
    closing_time: str
    last_admission: str


@app.get("/api/ping")
def ping():
    """Health check endpoint: proves API & DB connectivity."""
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return {"status": "ok"}
    except SQLAlchemyError as exc:
        # Let the client know the backend is not healthy
        raise HTTPException(status_code=503, detail="database_unavailable") from exc


@app.get("/api/home", response_model=HomeStatus)
def get_home_status():
    """
    Return the current visitor info from the DB.
    - Uses COALESCE to avoid NULLs.
    - Casts minutes to int explicitly.
    - If anything fails, returns safe fallbacks.
    """
    query = text(
        """
        SELECT
          COALESCE(tickets_url, 'https://blarneycastle.ie/gardens/') AS tickets_url,
          COALESCE(castle_queue_wait_mins, 0)                         AS castle_queue_wait_mins,
          COALESCE(car_park_status, 'Spaces Available')               AS car_park_status,
          COALESCE(closing_time, '6pm')                               AS closing_time,
          COALESCE(last_admission, '5pm')                             AS last_admission
        FROM site_status
        ORDER BY updated_at DESC
        LIMIT 1
        """
    )

    try:
        with engine.connect() as conn:
            row = conn.execute(query).mappings().first()
    except SQLAlchemyError:
        row = None

    if not row:
        # Fallback defaults if DB empty or query failed
        return HomeStatus(
            tickets_url="https://blarneycastle.ie/gardens/",
            castle_queue_wait_mins=0,
            car_park_status="Spaces Available",
            closing_time="6pm",
            last_admission="5pm",
        )

    # Ensure correct types
    data = dict(row)
    try:
        data["castle_queue_wait_mins"] = int(data.get("castle_queue_wait_mins", 0))
    except (TypeError, ValueError):
        data["castle_queue_wait_mins"] = 0

    return HomeStatus(**data)

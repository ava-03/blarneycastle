"""
main.py — FastAPI backend for Blarney Castle Visitor App
---------------------------------------------------------
Provides two routes:
  • /api/ping  — health check for app connectivity
  • /api/home  — returns live info from the site_status table
---------------------------------------------------------
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, text
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")
DB_HOST = os.getenv("DB_HOST", "127.0.0.1")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_NAME = os.getenv("DB_NAME", "blarney")

# Create database connection string
DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}?charset=utf8mb4"


# Create SQLAlchemy engine
engine = create_engine(DATABASE_URL, pool_pre_ping=True)

# Initialize FastAPI
app = FastAPI(title="Blarney Castle API")

# Allow Expo/web connections during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # (we’ll tighten this later)
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the model shape returned to the app
class HomeStatus(BaseModel):
    tickets_url: str
    castle_queue_wait_mins: int
    car_park_status: str
    closing_time: str
    last_admission: str


@app.get("/api/ping")
def ping():
    """Health check endpoint."""
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
    return {"status": "ok"}


@app.get("/api/home", response_model=HomeStatus)
def get_home_status():
    """Return the current visitor info from the DB."""
    query = text("""
        SELECT tickets_url, castle_queue_wait_mins, car_park_status, closing_time, last_admission
        FROM site_status
        ORDER BY updated_at DESC
        LIMIT 1
    """)

    with engine.connect() as conn:
        row = conn.execute(query).mappings().first()

    if not row:
        # fallback defaults if DB empty
        return HomeStatus(
            tickets_url="https://blarneycastle.ie/gardens/",
            castle_queue_wait_mins=0,
            car_park_status="Spaces Available",
            closing_time="6pm",
            last_admission="5pm"
        )

    return HomeStatus(**row)

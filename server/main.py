import os
from datetime import datetime, timedelta
from typing import Optional

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import jwt, JWTError
from passlib.context import CryptContext
from pydantic import BaseModel
from sqlalchemy import select

from db import SessionLocal, POI, SiteStatus, StaffUser, Base, engine

app = FastAPI(title="Blarney API (MySQL)")

# Ensure tables exist (simple migration-free approach)
Base.metadata.create_all(bind=engine)

# Allow web dev origins (localhost/127.0.0.1 on ANY port) + Expo tunnel domains
# + staff dashboard domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://blarneycastle.onrender.com",
        "https://admin.staff-bc.com",
    ],
    allow_origin_regex=r"^(http://localhost:\d+|http://127\.0\.0\.1:\d+|https://.*\.exp\.direct|https://.*\.expo\.dev)$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Auth config + helpers

JWT_SECRET = os.getenv("JWT_SECRET", "")
JWT_ALG = "HS256"
JWT_EXPIRES_DAYS = int(os.getenv("JWT_EXPIRES_DAYS", "90"))

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")
bearer_scheme = HTTPBearer(auto_error=False)


def hash_password(plain_password: str) -> str:
    return pwd_context.hash(plain_password)

def verify_password(plain_password: str, password_hash: str) -> bool:
    return pwd_context.verify(plain_password, password_hash)

def create_access_token(username: str) -> str:
    if not JWT_SECRET:
        # In production, set JWT_SECRET in Render env vars
        raise HTTPException(status_code=500, detail="JWT_SECRET is not configured")
    expire = datetime.utcnow() + timedelta(days=JWT_EXPIRES_DAYS)
    payload = {"sub": username, "exp": expire}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)

def get_current_staff_user(
    creds: Optional[HTTPAuthorizationCredentials] = Depends(bearer_scheme),
):
    if creds is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")

    token = creds.credentials
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
        username = payload.get("sub")
        if not username:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    with SessionLocal() as db:
        user = (
            db.execute(select(StaffUser).where(StaffUser.username == username).limit(1))
            .scalars()
            .first()
        )
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user


# Validation constants

QUEUE_OPTIONS = set(range(5, 121, 5))
CAR_PARK_OPTIONS = {"Spaces Available", "Full", "Closed"}
CLOSING_OPTIONS = {"17:00", "17:30", "18:00"}
LAST_ADMISSION_OPTIONS = {"16:00", "16:30", "17:00"}

FIXED_TICKETS_URL = "https://blarneycastle.retailint-tickets.com/Event/GENERALADM"


# Response/request models

class HomeStatus(BaseModel):
    tickets_url: str
    castle_queue_wait_mins: int
    car_park_status: str
    closing_time: str
    last_admission: str

class LoginRequest(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class AdminStatusUpdate(BaseModel):
    castle_queue_wait_mins: int
    car_park_status: str
    closing_time: str
    last_admission: str

class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str


# public endpoints

@app.get("/")
def home_root():
    return {
        "ok": True,
        "message": "Blarney API running",
        "endpoints": ["/api/ping", "/api/home", "/api/poi", "/docs"],
    }

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
                tickets_url=FIXED_TICKETS_URL,
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


#  Auth + Admin endpoints

@app.post("/auth/login", response_model=LoginResponse)
def login(req: LoginRequest):
    with SessionLocal() as db:
        user = (
            db.execute(select(StaffUser).where(StaffUser.username == req.username).limit(1))
            .scalars()
            .first()
        )

        if not user or not verify_password(req.password, user.password_hash):
            raise HTTPException(status_code=401, detail="Invalid credentials")

        token = create_access_token(user.username)
        return LoginResponse(access_token=token)

@app.get("/admin/status", response_model=HomeStatus)
def admin_get_status(_user=Depends(get_current_staff_user)):
    # Reuse the public logic, but protected
    return get_home()

@app.post("/admin/status", response_model=HomeStatus)
def admin_post_status(payload: AdminStatusUpdate, _user=Depends(get_current_staff_user)):
    if payload.castle_queue_wait_mins not in QUEUE_OPTIONS:
        raise HTTPException(status_code=400, detail="Invalid queue time")
    if payload.car_park_status not in CAR_PARK_OPTIONS:
        raise HTTPException(status_code=400, detail="Invalid car park status")
    if payload.closing_time not in CLOSING_OPTIONS:
        raise HTTPException(status_code=400, detail="Invalid closing time")
    if payload.last_admission not in LAST_ADMISSION_OPTIONS:
        raise HTTPException(status_code=400, detail="Invalid last admission time")

    with SessionLocal() as db:
        row = SiteStatus(
            tickets_url=FIXED_TICKETS_URL,
            castle_queue_wait_mins=payload.castle_queue_wait_mins,
            car_park_status=payload.car_park_status,
            closing_time=payload.closing_time,
            last_admission=payload.last_admission,
        )
        db.add(row)
        db.commit()
        db.refresh(row)

        return HomeStatus(
            tickets_url=row.tickets_url,
            castle_queue_wait_mins=row.castle_queue_wait_mins,
            car_park_status=row.car_park_status,
            closing_time=row.closing_time,
            last_admission=row.last_admission,
        )

@app.post("/admin/change-password")
def admin_change_password(payload: ChangePasswordRequest, user=Depends(get_current_staff_user)):
    if len(payload.new_password) < 10:
        raise HTTPException(status_code=400, detail="Password must be at least 10 characters")

    if len(payload.new_password.encode("utf-8")) > 72:
        raise HTTPException(status_code=400, detail="Password too long (max 72 bytes)")

    with SessionLocal() as db:
        db_user = (
            db.execute(select(StaffUser).where(StaffUser.id == user.id).limit(1))
            .scalars()
            .first()
        )

        if not db_user or not verify_password(payload.current_password, db_user.password_hash):
            raise HTTPException(status_code=400, detail="Current password is incorrect")

        db_user.password_hash = hash_password(payload.new_password)
        db.commit()

    return {"ok": True}
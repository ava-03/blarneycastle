import os
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker
from dotenv import load_dotenv

load_dotenv()

DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_NAME = os.getenv("DB_NAME")

SSL_CA_PATH = os.path.join(os.path.dirname(__file__), "aiven-ca.pem")

DATABASE_URL = f"mysql+mysqlconnector://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(
    DATABASE_URL,
    future=True,
    pool_pre_ping=True,
    connect_args={
        "ssl_ca": SSL_CA_PATH,
        "ssl_verify_cert": True,
    },
)

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)
Base = declarative_base()


class POI(Base):
    __tablename__ = "poi"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    lat = Column(Integer, nullable=False)
    lng = Column(Integer, nullable=False)


class SiteStatus(Base):
    __tablename__ = "site_status"
    id = Column(Integer, primary_key=True, index=True)
    tickets_url = Column(String(255), nullable=False)
    castle_queue_wait_mins = Column(Integer, nullable=False)
    car_park_status = Column(String(100), nullable=False)
    closing_time = Column(String(20), nullable=False)
    last_admission = Column(String(20), nullable=False)

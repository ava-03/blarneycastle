from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = "mysql+mysqlconnector://blarney_user:blarney1446@127.0.0.1:3306/blarney"

engine = create_engine(DATABASE_URL, future=True)
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

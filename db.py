from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = "mysql+mysqlconnector://blarney_user:blarney1446@127.0.0.1:3306/blarney"

engine = create_engine(DATABASE_URL, future=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)
Base = declarative_base()

class POI(Base):
    __tablename__ = "poi"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    lat = Column(Float, nullable=False)
    lng = Column(Float, nullable=False)

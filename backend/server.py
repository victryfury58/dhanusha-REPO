from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Dhanusha Production API")
api_router = APIRouter(prefix="/api")


# ---------------- Models ----------------
class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    service: Optional[str] = None
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class LeadCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: str = Field(..., min_length=3, max_length=200)
    phone: str = Field(..., min_length=4, max_length=30)
    service: Optional[str] = Field(None, max_length=120)
    message: str = Field(..., min_length=1, max_length=3000)


class SiteSettings(BaseModel):
    model_config = ConfigDict(extra="ignore")
    show_testimonials: bool = False


DEFAULT_SETTINGS = {"_id": "site", "show_testimonials": False}


# ---------------- Routes ----------------
@api_router.get("/")
async def root():
    return {"message": "Dhanusha Production API is live"}


@api_router.post("/leads", response_model=Lead)
async def create_lead(payload: LeadCreate):
    lead = Lead(**payload.model_dump())
    await db.leads.insert_one(lead.model_dump())
    logger.info("New lead captured: %s <%s>", lead.name, lead.email)
    return lead


@api_router.get("/leads", response_model=List[Lead])
async def list_leads():
    docs = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return [Lead(**d) for d in docs]


@api_router.get("/settings", response_model=SiteSettings)
async def get_settings():
    doc = await db.settings.find_one({"_id": "site"})
    if not doc:
        await db.settings.insert_one(dict(DEFAULT_SETTINGS))
        return SiteSettings()
    return SiteSettings(**doc)


@api_router.put("/settings", response_model=SiteSettings)
async def update_settings(payload: SiteSettings):
    await db.settings.update_one(
        {"_id": "site"},
        {"$set": payload.model_dump()},
        upsert=True,
    )
    return payload


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

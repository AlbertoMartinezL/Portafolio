from fastapi import APIRouter

from app.api.routes import contact, health, profile, projects

api_router = APIRouter(prefix="/api")
api_router.include_router(health.router)
api_router.include_router(profile.router)
api_router.include_router(projects.router)
api_router.include_router(contact.router)

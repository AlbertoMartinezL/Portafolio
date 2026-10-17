from fastapi import APIRouter, HTTPException

from app.models.schemas import Project
from app.services import content

router = APIRouter(prefix="/projects", tags=["projects"])


@router.get("", response_model=list[Project])
def list_projects(tag: str | None = None, featured: bool | None = None):
    projects = content.get_projects()
    if tag:
        projects = [p for p in projects if tag.lower() in (t.lower() for t in p.tags)]
    if featured is not None:
        projects = [p for p in projects if p.featured == featured]
    return projects


@router.get("/{slug}", response_model=Project)
def read_project(slug: str):
    project = content.get_project(slug)
    if project is None:
        raise HTTPException(status_code=404, detail="Proyecto no encontrado")
    return project

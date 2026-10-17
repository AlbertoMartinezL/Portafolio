"""Carga el contenido del portafolio desde archivos JSON en app/data/.

Los archivos se leen en cada petición (son pequeños), así que cualquier cambio
en los JSON se refleja con solo recargar el navegador, sin reiniciar el servidor.
"""
import json

from app.core.config import get_settings
from app.models.schemas import Education, Experience, Profile, Project, SkillCategory


def _load(name: str):
    path = get_settings().data_dir / f"{name}.json"
    with path.open(encoding="utf-8") as f:
        return json.load(f)


def get_profile() -> Profile:
    return Profile(**_load("profile"))


def get_skills() -> list[SkillCategory]:
    return [SkillCategory(**s) for s in _load("skills")]


def get_experience() -> list[Experience]:
    return [Experience(**e) for e in _load("experience")]


def get_education() -> Education:
    return Education(**_load("education"))


def get_projects() -> list[Project]:
    return [Project(**p) for p in _load("projects")]


def get_project(slug: str) -> Project | None:
    return next((p for p in get_projects() if p.slug == slug), None)

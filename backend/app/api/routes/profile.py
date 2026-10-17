from fastapi import APIRouter

from app.models.schemas import Education, Experience, Profile, SkillCategory
from app.services import content

router = APIRouter(tags=["profile"])


@router.get("/profile", response_model=Profile)
def read_profile():
    return content.get_profile()


@router.get("/skills", response_model=list[SkillCategory])
def read_skills():
    return content.get_skills()


@router.get("/experience", response_model=list[Experience])
def read_experience():
    return content.get_experience()


@router.get("/education", response_model=Education)
def read_education():
    return content.get_education()

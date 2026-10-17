from pydantic import BaseModel, EmailStr, Field, HttpUrl


class SocialLink(BaseModel):
    name: str
    url: HttpUrl


class Profile(BaseModel):
    name: str
    title: str
    tagline: str
    about: list[str]
    location: str
    email: EmailStr
    avatar_url: str | None = None
    cv_url: str | None = None
    socials: list[SocialLink] = []


class SkillCategory(BaseModel):
    category: str
    items: list[str]


class Experience(BaseModel):
    company: str
    role: str
    start: str
    end: str | None = None  # None = actualidad
    description: str
    highlights: list[str] = []
    stack: list[str] = []


class Degree(BaseModel):
    degree: str
    institution: str
    start: str
    end: str | None = None


class Education(BaseModel):
    degrees: list[Degree]
    courses: list[str] = []
    languages: list[str] = []


class Project(BaseModel):
    slug: str
    title: str
    summary: str
    description: str
    category: str  # p. ej. "Data Engineering", "Machine Learning", "GenAI"
    tags: list[str]
    featured: bool = False
    repo_url: HttpUrl | None = None
    demo_url: HttpUrl | None = None
    image_url: str | None = None
    highlights: list[str] = []
    metrics: dict[str, str] = {}


class ContactMessage(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(min_length=10, max_length=2000)


class ContactResponse(BaseModel):
    ok: bool
    detail: str

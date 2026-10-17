// Espejo de backend/app/models/schemas.py

export interface SocialLink {
  name: string;
  url: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  about: string[];
  location: string;
  email: string;
  avatar_url: string | null;
  cv_url: string | null;
  socials: SocialLink[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Experience {
  company: string;
  role: string;
  start: string;
  end: string | null;
  description: string;
  highlights: string[];
  stack: string[];
}

export interface Degree {
  degree: string;
  institution: string;
  start: string;
  end: string | null;
}

export interface Education {
  degrees: Degree[];
  courses: string[];
  languages: string[];
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string;
  category: string;
  tags: string[];
  featured: boolean;
  repo_url: string | null;
  demo_url: string | null;
  image_url: string | null;
  highlights: string[];
  metrics: Record<string, string>;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

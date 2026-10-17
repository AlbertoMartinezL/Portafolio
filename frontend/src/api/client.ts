import type {
  ContactMessage,
  Education,
  Experience,
  Profile,
  Project,
  SkillCategory,
} from "../types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) throw new Error(`Error ${res.status} en ${path}`);
  return res.json() as Promise<T>;
}

export const api = {
  getProfile: () => request<Profile>("/profile"),
  getSkills: () => request<SkillCategory[]>("/skills"),
  getExperience: () => request<Experience[]>("/experience"),
  getEducation: () => request<Education>("/education"),
  getProjects: () => request<Project[]>("/projects"),
  getProject: (slug: string) => request<Project>(`/projects/${slug}`),
  sendContact: (msg: ContactMessage) =>
    request<{ ok: boolean; detail: string }>("/contact", {
      method: "POST",
      body: JSON.stringify(msg),
    }),
};

import { Link } from "react-router-dom";
import type { Project } from "../../types";
import Tag from "./Tag";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card project-card">
      <span className="project-card__category">{project.category}</span>
      <h3>
        <Link to={`/proyectos/${project.slug}`}>{project.title}</Link>
      </h3>
      <p>{project.summary}</p>
      <div className="tags">
        {project.tags.map((t) => (
          <Tag key={t} label={t} />
        ))}
      </div>
      <div className="project-card__links">
        {project.repo_url && (
          <a href={project.repo_url} target="_blank" rel="noreferrer">
            Código
          </a>
        )}
        {project.demo_url && (
          <a href={project.demo_url} target="_blank" rel="noreferrer">
            Demo
          </a>
        )}
      </div>
    </article>
  );
}

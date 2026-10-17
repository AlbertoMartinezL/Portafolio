import { Link, useParams } from "react-router-dom";
import { api } from "../api/client";
import { ErrorMessage, Loading } from "../components/ui/Status";
import Tag from "../components/ui/Tag";
import { useFetch } from "../hooks/useFetch";

export default function ProjectDetail() {
  const { slug = "" } = useParams();
  const { data: project, error, loading } = useFetch(() => api.getProject(slug), [slug]);

  if (loading) return <Loading />;
  if (error || !project) return <ErrorMessage message={error ?? "Proyecto no encontrado"} />;

  return (
    <article className="section container project-detail">
      <Link to="/#proyectos" className="muted">
        ← Volver a proyectos
      </Link>
      <span className="project-card__category">{project.category}</span>
      <h1>{project.title}</h1>
      <p className="lead">{project.description}</p>

      {Object.keys(project.metrics).length > 0 && (
        <div className="metrics">
          {Object.entries(project.metrics).map(([k, v]) => (
            <div key={k} className="card metric">
              <strong>{v}</strong>
              <span className="muted">{k}</span>
            </div>
          ))}
        </div>
      )}

      {project.highlights.length > 0 && (
        <>
          <h3>Puntos clave</h3>
          <ul>
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </>
      )}

      <div className="tags">
        {project.tags.map((t) => (
          <Tag key={t} label={t} />
        ))}
      </div>
      <div className="hero__actions">
        {project.repo_url && (
          <a className="btn btn--primary" href={project.repo_url} target="_blank" rel="noreferrer">
            Ver código
          </a>
        )}
        {project.demo_url && (
          <a className="btn" href={project.demo_url} target="_blank" rel="noreferrer">
            Demo en vivo
          </a>
        )}
      </div>
    </article>
  );
}

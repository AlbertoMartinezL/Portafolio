import { api } from "../api/client";
import SectionTitle from "../components/ui/SectionTitle";
import { ErrorMessage, Loading } from "../components/ui/Status";
import Tag from "../components/ui/Tag";
import { useFetch } from "../hooks/useFetch";

export default function Experience() {
  const { data, error, loading } = useFetch(api.getExperience);

  return (
    <section id="experiencia" className="section container">
      <SectionTitle eyebrow="04" title="Experiencia" />
      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      <ol className="timeline">
        {data?.map((job) => (
          <li key={`${job.company}-${job.start}`} className="timeline__item">
            <span className="muted">
              {job.start} — {job.end ?? "Actualidad"}
            </span>
            <h3>
              {job.role} · {job.company}
            </h3>
            <p>{job.description}</p>
            <ul>
              {job.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <div className="tags">
              {job.stack.map((s) => (
                <Tag key={s} label={s} />
              ))}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

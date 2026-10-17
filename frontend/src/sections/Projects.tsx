import { useMemo, useState } from "react";
import { api } from "../api/client";
import ProjectCard from "../components/ui/ProjectCard";
import SectionTitle from "../components/ui/SectionTitle";
import { ErrorMessage, Loading } from "../components/ui/Status";
import { useFetch } from "../hooks/useFetch";

const ALL = "Todos";

export default function Projects() {
  const { data, error, loading } = useFetch(api.getProjects);
  const [filter, setFilter] = useState(ALL);

  const categories = useMemo(
    () => [ALL, ...new Set(data?.map((p) => p.category) ?? [])],
    [data],
  );
  const visible = data?.filter((p) => filter === ALL || p.category === filter);

  return (
    <section id="proyectos" className="section container">
      <SectionTitle eyebrow="03" title="Proyectos" />
      <div className="filters">
        {categories.map((c) => (
          <button
            key={c}
            className={`filter ${c === filter ? "filter--active" : ""}`}
            onClick={() => setFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>
      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      <div className="grid grid--2">
        {visible?.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}

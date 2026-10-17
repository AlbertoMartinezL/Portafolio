import { api } from "../api/client";
import SectionTitle from "../components/ui/SectionTitle";
import { ErrorMessage, Loading } from "../components/ui/Status";
import Tag from "../components/ui/Tag";
import { useFetch } from "../hooks/useFetch";

export default function Education() {
  const { data, error, loading } = useFetch(api.getEducation);

  return (
    <section id="educacion" className="section container">
      <SectionTitle eyebrow="05" title="Educación" />
      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {data && (
        <div className="grid grid--3">
          {data.degrees.map((d) => (
            <div key={d.degree} className="card">
              <span className="muted">
                {d.start} — {d.end ?? "Actualidad"}
              </span>
              <h3>{d.degree}</h3>
              <p>{d.institution}</p>
            </div>
          ))}
          <div className="card">
            {data.courses.length > 0 && (
              <>
                <h3>Cursos</h3>
                <div className="tags">
                  {data.courses.map((c) => (
                    <Tag key={c} label={c} />
                  ))}
                </div>
              </>
            )}
            {data.languages.length > 0 && (
              <>
                <h3>Idiomas</h3>
                <ul>
                  {data.languages.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

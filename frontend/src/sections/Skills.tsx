import { api } from "../api/client";
import SectionTitle from "../components/ui/SectionTitle";
import { ErrorMessage, Loading } from "../components/ui/Status";
import Tag from "../components/ui/Tag";
import { useFetch } from "../hooks/useFetch";

export default function Skills() {
  const { data, error, loading } = useFetch(api.getSkills);

  return (
    <section id="habilidades" className="section container">
      <SectionTitle eyebrow="02" title="Habilidades" />
      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      <div className="grid grid--3">
        {data?.map((cat) => (
          <div key={cat.category} className="card">
            <h3>{cat.category}</h3>
            <div className="tags">
              {cat.items.map((s) => (
                <Tag key={s} label={s} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

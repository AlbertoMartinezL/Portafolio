import SectionTitle from "../components/ui/SectionTitle";
import type { Profile } from "../types";

export default function About({ profile }: { profile: Profile }) {
  return (
    <section id="sobre-mi" className="section container">
      <SectionTitle eyebrow="01" title="Sobre mí" />
      {profile.about.map((p, i) => (
        <p key={i} className="lead">
          {p}
        </p>
      ))}
      <p className="muted">📍 {profile.location}</p>
    </section>
  );
}

import { useState } from "react";
import type { Profile } from "../types";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function Avatar({ profile }: { profile: Profile }) {
  const [failed, setFailed] = useState(false);
  const showPhoto = profile.avatar_url && !failed;

  return (
    <div className="hero__avatar">
      {showPhoto ? (
        <img src={profile.avatar_url!} alt={`Foto de ${profile.name}`} onError={() => setFailed(true)} />
      ) : (
        <span aria-hidden="true">{initials(profile.name)}</span>
      )}
    </div>
  );
}

export default function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="hero container">
      <div className="hero__text">
        <p className="hero__hello">Hola, soy</p>
        <h1>{profile.name}</h1>
        <h2 className="hero__title">{profile.title}</h2>
        <p className="hero__tagline">{profile.tagline}</p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#proyectos">
            Ver proyectos
          </a>
          {profile.cv_url && (
            <a className="btn" href={profile.cv_url} download>
              Descargar CV
            </a>
          )}
          {profile.socials.map((s) => (
            <a key={s.name} className="btn" href={s.url} target="_blank" rel="noreferrer">
              {s.name}
            </a>
          ))}
        </div>
      </div>
      <Avatar profile={profile} />
    </section>
  );
}

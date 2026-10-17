import { Link } from "react-router-dom";

const links = [
  { href: "/#sobre-mi", label: "Sobre mí" },
  { href: "/#habilidades", label: "Habilidades" },
  { href: "/#proyectos", label: "Proyectos" },
  { href: "/#experiencia", label: "Experiencia" },
  { href: "/#educacion", label: "Educación" },
  { href: "/#contacto", label: "Contacto" },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <nav className="container navbar__inner">
        <Link to="/" className="navbar__brand">
          &lt;Data &amp; AI /&gt;
        </Link>
        <ul className="navbar__links">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="section container">
      <h1>404</h1>
      <p className="lead">Esta página no existe.</p>
      <Link className="btn btn--primary" to="/">
        Ir al inicio
      </Link>
    </section>
  );
}

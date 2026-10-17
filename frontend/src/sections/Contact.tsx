import { FormEvent, useState } from "react";
import { api } from "../api/client";
import SectionTitle from "../components/ui/SectionTitle";

type State = "idle" | "sending" | "sent" | "error";

export default function Contact({ email }: { email: string }) {
  const [state, setState] = useState<State>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setState("sending");
    try {
      const res = await api.sendContact({
        name: String(data.get("name")),
        email: String(data.get("email")),
        message: String(data.get("message")),
      });
      setFeedback(res.detail);
      setState("sent");
      form.reset();
    } catch {
      setFeedback("Revisa los datos e inténtalo de nuevo.");
      setState("error");
    }
  }

  return (
    <section id="contacto" className="section container">
      <SectionTitle eyebrow="06" title="Contacto" />
      <p className="lead">
        ¿Tienes un proyecto o una vacante? Escríbeme a <a href={`mailto:${email}`}>{email}</a> o usa
        el formulario.
      </p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre" required minLength={2} />
        <input name="email" type="email" placeholder="Correo" required />
        <textarea name="message" placeholder="Mensaje" rows={5} required minLength={10} />
        <button className="btn btn--primary" disabled={state === "sending"}>
          {state === "sending" ? "Enviando…" : "Enviar"}
        </button>
        {feedback && (
          <p className={state === "error" ? "status status--error" : "status"}>{feedback}</p>
        )}
      </form>
    </section>
  );
}

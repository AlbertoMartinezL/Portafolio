export function Loading() {
  return <p className="status">Cargando…</p>;
}

export function ErrorMessage({ message }: { message: string }) {
  return <p className="status status--error">No se pudo cargar: {message}</p>;
}

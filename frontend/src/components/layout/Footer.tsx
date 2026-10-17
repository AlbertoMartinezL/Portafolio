export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        © {new Date().getFullYear()} Alberto Antonio Martínez López · Hecho con React y FastAPI
      </div>
    </footer>
  );
}

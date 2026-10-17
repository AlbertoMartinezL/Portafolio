# Portafolio — Ingeniero de Datos e IA

Sitio web personal para mostrar proyectos, habilidades y experiencia.

| Capa      | Tecnología                                   |
|-----------|----------------------------------------------|
| Frontend  | React 18 + Vite + TypeScript + React Router  |
| Backend   | Python 3.12 + FastAPI + Pydantic             |
| Contenido | Archivos JSON en `backend/app/data/` (sin base de datos) |
| Infra     | Docker + Docker Compose (Nginx sirve el frontend) |

## Estructura

```
Portfolio/
├── backend/                  # API REST en FastAPI
│   ├── app/
│   │   ├── main.py           # Punto de entrada, CORS, registro de routers
│   │   ├── core/config.py    # Configuración vía variables de entorno
│   │   ├── api/routes/       # Endpoints: health, profile, projects, contact
│   │   ├── models/schemas.py # Modelos Pydantic (contrato de la API)
│   │   ├── services/         # Lógica: carga de contenido, contacto
│   │   └── data/             # <- EDITA AQUÍ tu contenido (perfil, proyectos, skills...)
│   ├── tests/                # Pytest
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/                 # SPA en React
│   ├── public/               # cv.pdf, favicon, imágenes de proyectos
│   ├── src/
│   │   ├── api/              # Cliente HTTP hacia el backend
│   │   ├── types/            # Tipos TS (espejo de schemas.py)
│   │   ├── hooks/            # useFetch
│   │   ├── components/       # layout/ (Navbar, Footer) y ui/ (tarjetas, títulos)
│   │   ├── sections/         # Hero, About, Skills, Projects, Experience, Contact
│   │   ├── pages/            # Home, ProjectDetail, NotFound
│   │   └── styles/           # CSS global (tema claro/oscuro)
│   ├── nginx.conf            # Sirve la SPA y hace proxy de /api al backend
│   └── Dockerfile
└── docker-compose.yml
```

## Desarrollo local

**Backend**
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate          # Windows  (source .venv/bin/activate en Linux/Mac)
pip install -r requirements.txt
uvicorn app.main:app --reload   # http://localhost:8000/docs
pytest
```

**Frontend**
```bash
cd frontend
npm install
npm run dev                     # http://localhost:5173  (proxy /api -> :8000)
```

**Todo con Docker**
```bash
docker compose up --build       # http://localhost:8080
```

## Endpoints

| Método | Ruta                    | Descripción                                 |
|--------|-------------------------|---------------------------------------------|
| GET    | `/api/health`           | Estado del servicio                         |
| GET    | `/api/profile`          | Datos personales y redes                    |
| GET    | `/api/skills`           | Habilidades por categoría                   |
| GET    | `/api/experience`       | Experiencia laboral                         |
| GET    | `/api/projects`         | Lista (filtros `?tag=` y `?featured=true`)  |
| GET    | `/api/projects/{slug}`  | Detalle de un proyecto                      |
| POST   | `/api/contact`          | Envía un mensaje de contacto                |

## Personalizar

1. Edita los JSON de `backend/app/data/` con tu información real.
2. Agrega tu CV en PDF en `frontend/public/cv.pdf`.
3. Para cada proyecto, enlaza el repo de GitHub y (si existe) una demo en vivo.

## Próximos pasos sugeridos

- **Demo de IA en vivo**: endpoint `/api/chat` con RAG sobre tu CV y proyectos.
- **Dashboard de datos**: gráficas de un pipeline real (p. ej. tus proyectos de Airflow o PySpark).
- **Contacto real**: enviar correo vía SMTP/Resend en `services/contact.py`.
- **CI/CD**: GitHub Actions (tests + build) y despliegue (Render/Railway para la API, Vercel/Netlify para el frontend).

# Portafolio — Alberto Antonio Martínez López

Sitio web de portafolio profesional (Ingeniero de Datos e IA).
Frontend en React 18 + Vite + TypeScript, backend en Python 3.12 + FastAPI. Todo corre con Docker Compose.

## graphify

Este proyecto tiene un grafo de conocimiento en `graphify-out/` con god nodes, comunidades y relaciones entre archivos.

Reglas:
- Cuando exista `graphify-out/graph.json`, ejecuta `graphify query "<pregunta>"` antes del primer grep, búsqueda o lectura de código fuente para cualquier pregunta sobre el código, e incluye esta regla en el prompt de todo subagente que explore código. Lee archivos completos solo para las líneas que el grafo o una lectura previa ya ubicaron. Usa `graphify path "<A>" "<B>"` para relaciones y `graphify explain "<concepto>"` para conceptos puntuales.
- Si existe `graphify-out/wiki/index.md`, úsalo para navegación general en lugar de recorrer el código.
- Lee `graphify-out/GRAPH_REPORT.md` solo para revisiones de arquitectura amplias o cuando query/path/explain no den suficiente contexto.
- Después de modificar código, ejecuta `graphify update .` para mantener el grafo al día (solo AST, sin costo de API).
- `graphify-out/graph.json` se reescribe completo en cada build; un diff grande en ese archivo es esperado. No lo marques como ruido ni sugieras omitir la reconstrucción del grafo.

## Estructura

- `backend/app/data/*.json` — **todo el contenido del sitio** (perfil, habilidades, experiencia, educación, proyectos). Cambios de contenido van aquí, no en el código.
- `backend/app/static/` — imágenes servidas en `/api/static/...` (foto de perfil: `foto.png`; CV en PDF: `cv.pdf`).
- `backend/app/models/schemas.py` — contrato de la API (Pydantic).
- `frontend/src/types/index.ts` — espejo en TypeScript de `schemas.py`. **Si cambias un modelo, actualiza ambos.**
- `frontend/src/sections/` — una sección por bloque del Home; `pages/` para rutas; `components/ui` para piezas reutilizables.
- `frontend/src/styles/global.css` — estilos con variables CSS (tema claro/oscuro). No hay Tailwind ni librería de UI.

## Flujo de trabajo

El usuario ve el sitio en **Docker** (`http://localhost:8080`), no con `npm run dev`.

| Cambio | Cómo se refleja |
|---|---|
| JSON en `backend/app/data/` o archivos en `static/` | Inmediato (volumen montado, se leen en cada petición). Solo recargar navegador. |
| Código Python del backend | Automático (`uvicorn --reload` dentro del contenedor). |
| Código del frontend (`frontend/src`, `index.html`) | Requiere `docker compose up -d --build frontend`. |

Verificar después de cambiar código:
- Backend: `cd backend && .venv\Scripts\python -m pytest -q`
- Frontend: `cd frontend && npm run build` (incluye chequeo de tipos con `tsc`)
- Si un endpoint nuevo se agrega, añadir su prueba en `backend/tests/test_api.py`.

## Reglas de contenido

- Interfaz y contenido en **español**.
- **No inventar** experiencia, habilidades, métricas ni proyectos: todo lo que aparece debe venir del CV o de lo que diga el usuario (debe poder defenderlo en una entrevista). Si falta información, preguntar o dejar marcado como ejemplo.
- **No publicar el teléfono** del usuario en el sitio; el contacto es por correo y LinkedIn.
- Toda URL en los JSON debe empezar con `https://` (Pydantic `HttpUrl` falla si no, y el Home muestra error).
- Los cambios de contenido no requieren tocar código; preferir editar JSON.

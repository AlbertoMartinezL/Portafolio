# Graph Report - Portfolio  (2026-10-16)

## Corpus Check
- Corpus is ~8,035 words - fits in a single context window. You may not need a graph.

## Summary
- 187 nodes · 396 edges · 12 communities (7 shown, 5 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 11 edges (avg confidence: 0.9)
- Token cost: 48,691 input · 0 output

## Community Hubs (Navigation)
- Backend API Routes
- Frontend UI Components
- Frontend Dependencies
- Backend Core & Tests
- Infra & Documentation
- API Client & Types
- TypeScript Config
- App Shell & Layout

## God Nodes (most connected - your core abstractions)
1. `SectionTitle()` - 13 edges
2. `Loading()` - 13 edges
3. `ErrorMessage()` - 13 edges
4. `useFetch()` - 13 edges
5. `Home()` - 13 edges
6. `compilerOptions` - 13 edges
7. `Tag()` - 11 edges
8. `_load()` - 8 edges
9. `api` - 8 edges
10. `Education()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `FastAPI REST backend` --references--> `fastapi==0.115.6`  [INFERRED]
  README.md → backend/requirements.txt
- `frontend index.html (SPA shell)` --implements--> `React 18 + Vite + TypeScript SPA`  [INFERRED]
  frontend/index.html → README.md
- `TS types mirror schemas.py (API contract)` --conceptually_related_to--> `pydantic[email] + pydantic-settings`  [INFERRED]
  README.md → backend/requirements.txt
- `Profile photo placeholder (foto.jpg, avatar_url)` --references--> `GET /api/profile`  [INFERRED]
  backend/app/static/LEEME.txt → README.md
- `docker-compose backend service` --references--> `uvicorn[standard]==0.34.0`  [EXTRACTED]
  docker-compose.yml → backend/requirements.txt

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Docker Compose deployment (backend + Nginx frontend + healthcheck)** — docker_compose_backend, docker_compose_frontend, docker_compose_healthcheck, readme_nginx_api_proxy [INFERRED 0.85]
- **Backend stack (FastAPI, Uvicorn, Pydantic)** — readme_fastapi_backend, backend_requirements_fastapi, backend_requirements_uvicorn, backend_requirements_pydantic [EXTRACTED 1.00]

## Communities (12 total, 5 thin omitted)

### Community 0 - "Backend API Routes"
Cohesion: 0.11
Nodes (25): contact(), read_education(), read_experience(), read_profile(), read_skills(), list_projects(), read_project(), get_settings() (+17 more)

### Community 1 - "Frontend UI Components"
Cohesion: 0.27
Nodes (17): api, ProjectCard(), Props, SectionTitle(), ErrorMessage(), Loading(), Tag(), useFetch() (+9 more)

### Community 2 - "Frontend Dependencies"
Cohesion: 0.08
Nodes (23): dependencies, react, react-dom, react-router-dom, devDependencies, @types/react, @types/react-dom, typescript (+15 more)

### Community 4 - "Infra & Documentation"
Cohesion: 0.13
Nodes (18): Profile photo placeholder (foto.jpg, avatar_url), Backend Python requirements, fastapi==0.115.6, pydantic[email] + pydantic-settings, pytest + httpx (testing), uvicorn[standard]==0.34.0, docker-compose backend service, docker-compose frontend service (+10 more)

### Community 5 - "API Client & Types"
Cohesion: 0.22
Nodes (11): Avatar(), Hero(), initials(), ContactMessage, Degree, Education, Experience, Profile (+3 more)

### Community 6 - "TypeScript Config"
Cohesion: 0.13
Nodes (14): compilerOptions, isolatedModules, jsx, lib, module, moduleResolution, noEmit, noUnusedLocals (+6 more)

### Community 7 - "App Shell & Layout"
Cohesion: 0.25
Nodes (8): App(), Footer(), links, Navbar(), NotFound(), react, react-dom, react-router-dom

## Knowledge Gaps
- **6 isolated node(s):** `@types/react`, `@types/react-dom`, `typescript`, `Suggested next steps (RAG chat, data dashboard, SMTP contact, CI/CD)`, `pytest + httpx (testing)` (+1 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 64 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `frontend index.html (SPA shell)` connect `Infra & Documentation` to `App Shell & Layout`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **What connects `@types/react`, `@types/react-dom`, `typescript` to the rest of the system?**
  _6 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Backend API Routes` be split into smaller, more focused modules?**
  _Cohesion score 0.11463414634146342 - nodes in this community are weakly interconnected._
- **Why does `react` connect `App Shell & Layout` to `Frontend UI Components`, `Frontend Dependencies`, `API Client & Types`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Should `Frontend Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Should `Backend Core & Tests` be split into smaller, more focused modules?**
  _Cohesion score 0.10476190476190476 - nodes in this community are weakly interconnected._
- **Should `Infra & Documentation` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
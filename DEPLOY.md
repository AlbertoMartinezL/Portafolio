# Despliegue y CI/CD — albertoengineer.com

```
git push (main) ──► GitHub Actions ──► Tests backend (pytest)
                                   └─► Build frontend (tsc + vite)
                                          │ ambos OK
                                          ▼
                                   SSH al VPS ──► git pull + docker compose up --build
                                          ▼
                                   Verifica https://albertoengineer.com/api/health
```

Si un test falla, **no se despliega** y el sitio en línea sigue intacto.
Los pull requests corren los tests pero nunca despliegan.

---

## Configuración inicial (una sola vez)

### 1. Repositorio en GitHub
Crea un repositorio nuevo (`Portafolio`) en https://github.com/new y sube el proyecto:
```bash
cd Portfolio
git init -b main
git add .
git commit -m "Portafolio inicial"
git remote add origin https://github.com/AlbertoMartinezL/Portafolio.git
git push -u origin main
```
El primer push correrá los tests; el job de despliegue fallará hasta completar los pasos 2–5 (es normal).

### 2. Servidor en Google Compute Engine
Una VM con Ubuntu 22.04/24.04 o Debian 12 y 1–2 GB de RAM es suficiente (`e2-micro` o `e2-small`).
En la consola de GCP revisa tres cosas:

1. **IP estática** — VPC network → *IP addresses* → en la IP externa de la VM, **Reserve / Promote to static**.
   Sin esto la IP cambia si la VM se reinicia y el dominio deja de funcionar.
2. **Firewall** — Compute Engine → VM → *Edit* → marca **Allow HTTP traffic** y **Allow HTTPS traffic**.
3. **Acceso SSH** — en GCE no se entra como `root`: usa el botón **SSH** de la consola (o `gcloud compute ssh`) y ejecuta con `sudo`.

Anota la **IP externa estática**.

### 3. DNS en GoDaddy
GoDaddy → Mis productos → `albertoengineer.com` → **DNS** → Registros:

| Tipo | Nombre | Valor          | TTL     |
|------|--------|----------------|---------|
| A    | `@`    | `IP_DEL_VPS`   | 1 hora  |
| A    | `www`  | `IP_DEL_VPS`   | 1 hora  |

Elimina cualquier registro A de `@` existente (el de "Parked"/estacionado) y el CNAME de `www` si apunta a otro lado.
Comprueba la propagación con `nslookup albertoengineer.com` (puede tardar de minutos a unas horas).

### 4. Preparar el servidor
```bash
# desde la terminal SSH de la consola de GCP
curl -fsSL https://raw.githubusercontent.com/AlbertoMartinezL/Portafolio/main/deploy/setup-server.sh -o setup.sh
sudo bash setup.sh https://github.com/AlbertoMartinezL/Portafolio.git
```
Instala Docker, agrega 2 GB de swap, crea el usuario `deploy`, activa el firewall local y clona el repo.
(Si el repo es **privado**, el clon necesita una *deploy key* de solo lectura: GitHub → Settings → Deploy keys.)

### 5. Llave SSH para GitHub Actions
En tu PC (PowerShell):
```powershell
ssh-keygen -t ed25519 -f $HOME\.ssh\portfolio_deploy -N '""' -C "github-actions"
```
- Copia el contenido de `portfolio_deploy.pub` (pública) al servidor, en `/home/deploy/.ssh/authorized_keys`.
- Obtén la huella del servidor: `ssh-keyscan IP_DEL_VPS`

En GitHub → repo → **Settings → Secrets and variables → Actions → New repository secret**:

| Secreto           | Valor                                               |
|-------------------|-----------------------------------------------------|
| `VPS_HOST`        | IP del VPS                                          |
| `VPS_USER`        | `deploy`                                            |
| `VPS_SSH_KEY`     | contenido completo de `portfolio_deploy` (privada)  |
| `VPS_KNOWN_HOSTS` | salida completa de `ssh-keyscan IP_DEL_VPS`         |

### 6. Primer arranque
```bash
ssh deploy@IP_DEL_VPS
cd ~/portfolio && docker compose -f docker-compose.prod.yml up -d --build
```
Caddy obtiene el certificado HTTPS automáticamente en cuanto el DNS apunta al VPS.
Abre https://albertoengineer.com 🎉

---

## Día a día

```bash
# edita contenido (backend/app/data/*.json) o código
git add .
git commit -m "Actualizo experiencia"
git push
```
Sigue el progreso en GitHub → pestaña **Actions**. En ~2–3 minutos el cambio está en línea.
También puedes redesplegar sin cambios: Actions → CI/CD → **Run workflow**.

## Archivos involucrados

| Archivo | Para qué |
|---|---|
| `.github/workflows/ci-cd.yml` | Pipeline: tests → build → deploy → verificación |
| `docker-compose.prod.yml` | Producción: Caddy + frontend + backend (sin recarga en vivo) |
| `deploy/Caddyfile` | HTTPS automático y redirección `www` → dominio principal |
| `deploy/setup-server.sh` | Preparación inicial del VPS |
| `docker-compose.yml` | Solo desarrollo local (`localhost:8080`) |

# Saville Curling Centre Starter (Vue 3 + Directus)

Vue 3 + TypeScript + Vite frontend with Directus as a headless CMS.

## Current architecture

- Frontend: Vue SPA in `src/`, built with Vite.
- CMS/API: Directus (Docker image).
- Data: Postgres.
- Local workflow: frontend runs on host (`npm run dev`), Directus + Postgres run in Docker Compose.
- Production target (Render):
  - Vue as a static site service
  - Directus as a separate web service (Docker)
  - Render managed Postgres

## Environment variables

Frontend (`.env` from `.env.example`):

- `VITE_DIRECTUS_URL` (required): Directus API base URL.
- `VITE_DIRECTUS_ADMIN_URL` (optional): explicit admin login URL for "Forgot Password".
- `VITE_DIRECTUS_ENFORCE_MEMBER_ROLE` (optional): `true` / `false`.
- `VITE_DIRECTUS_MEMBER_ROLE_ALLOWLIST` (optional): comma-separated role/policy names or IDs.

Directus (`.env.directus` from `.env.directus.example`):

- `KEY`, `SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`
- `PUBLIC_URL`, `CORS_ENABLED`, `CORS_ORIGIN`
- `DB_CLIENT`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USER`, `DB_PASSWORD`

## Local development (keeps current workflow)

1. Install frontend dependencies:

```bash
npm install
```

2. Create local frontend env:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

3. Create local Directus env:

```bash
cp .env.directus.example .env.directus
```

Windows PowerShell:

```powershell
Copy-Item .env.directus.example .env.directus
```

4. Start local CMS stack (Directus + Postgres in Docker):

```bash
npm run cms:up
```

5. Start Vue dev server (outside Docker):

```bash
npm run dev
```

Useful CMS commands:

```bash
npm run cms:logs
npm run cms:down
```

## Render deployment

This repo includes `render.yaml` and `Dockerfile.directus`.

- Static site: `saville-web`
- Directus web service (Docker): `saville-directus`
- Managed Postgres: `saville-db`

### Deploy steps

1. Push this repository to GitHub.
2. In Render, create a Blueprint service from the repo (uses `render.yaml`).
3. Set required secrets in Render:
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `CORS_ORIGIN` (your frontend URL)
   - optional `VITE_DIRECTUS_MEMBER_ROLE_ALLOWLIST`
4. Update URLs after first deploy:
   - `PUBLIC_URL` for Directus should match its actual Render URL or custom domain.
   - `VITE_DIRECTUS_URL` / `VITE_DIRECTUS_ADMIN_URL` should point to Directus.

## Routing notes (`/`, `/api`, `/admin`)

- `/` is handled by the Vue static site.
- `/admin` is provided by Directus at `<directus-domain>/admin`.
- `/api` on the same root domain as the static site is not natively handled by this simple Render setup because frontend and Directus are separate services.

### Cleanest production option

- Use separate domains:
  - Frontend: `https://www.example.com`
  - Directus API/Admin: `https://cms.example.com` (`/admin` lives here)
- Set:
  - `VITE_DIRECTUS_URL=https://cms.example.com`
  - `VITE_DIRECTUS_ADMIN_URL=https://cms.example.com/admin/login`

If strict same-domain path routing (`/api`, `/admin`) is mandatory, place a reverse proxy (for example Cloudflare, Nginx, or another edge gateway) in front of both Render services.

## Build

```bash
npm run build
```

## Project structure

```text
.
├─ src/
│  ├─ api/
│  ├─ assets/
│  ├─ components/
│  ├─ config/
│  ├─ router/
│  ├─ stores/
│  ├─ types/
│  ├─ views/
│  ├─ App.vue
│  └─ main.ts
├─ .env.example
├─ .env.directus.example
├─ docker-compose.yml
├─ Dockerfile.directus
├─ render.yaml
└─ vite.config.ts
```

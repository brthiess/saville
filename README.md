# Saville Curling Centre Starter (Vue 3 + Directus)

A frontend-only starter SPA for a curling club website. This project uses Vue 3 with TypeScript and Vite, and reads content from Directus as a headless CMS.

## Stack

- Vue 3 (SPA)
- TypeScript
- Vite
- Vue Router
- Pinia
- Directus REST API (local via Docker Compose or remote)

## What this starter includes

- Routes:
  - `/` (homepage)
  - `/leagues`
  - `/create-account` (Directus account registration)
  - `/member-login` (Directus member authentication)
- Reusable components:
  - `AppHeader`
  - `AppFooter`
  - `AnnouncementCard`
  - `LeagueCard`
- Directus API layer:
  - `src/api/auth.ts`
  - `src/api/directus.ts`
  - `src/api/announcements.ts`
  - `src/api/leagues.ts`
  - `src/api/siteSettings.ts`
- Shared TypeScript models in `src/types`
- Pinia app store for site settings + persisted member auth session
- Loading and friendly error states when API calls fail

## Prerequisites

- Node.js 18+ (Node 20 recommended)
- Docker Desktop (for the included local Directus instance), or an existing Directus instance

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure frontend environment variables:

```bash
cp .env.example .env
```

If you are on Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

3. Set your Directus URL in `.env`:

```env
VITE_DIRECTUS_URL=http://localhost:8055
VITE_DIRECTUS_ENFORCE_MEMBER_ROLE=false
VITE_DIRECTUS_MEMBER_ROLE_ALLOWLIST=Curler,Customer,Member
```

`VITE_DIRECTUS_ENFORCE_MEMBER_ROLE` can be switched to `true` to restrict member login.
`VITE_DIRECTUS_MEMBER_ROLE_ALLOWLIST` accepts role or policy names and/or UUIDs.

4. Configure local Directus environment variables (skip this if using a remote Directus URL):

```bash
cp .env.directus.example .env.directus
```

If you are on Windows PowerShell:

```powershell
Copy-Item .env.directus.example .env.directus
```

5. Start local Directus + Postgres (skip this if using a remote Directus URL):

```bash
docker compose up -d
```

6. Start the development server:

```bash
npm run dev
```

7. Build for production:

```bash
npm run build
```

## Local Directus instance

This repository includes a local Directus instance in `docker-compose.yml`.

- Directus URL: `http://localhost:8055`
- Postgres runs inside Docker and is wired to Directus automatically
- Local Directus config template: `.env.directus.example`

Useful commands:

```bash
npm run cms:up
npm run cms:logs
npm run cms:down
```

First login uses the values in `.env.directus`:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

## Directus collections expected

Public read access should be enabled for the following collections:

### `announcements`
- `id`
- `title`
- `summary`
- `date_posted`

### `leagues`
- `id`
- `name`
- `description`
- `day_of_week`
- `start_time`
- `skill_level`
- `registration_open`
- `price`

### `site_settings`
- `id`
- `club_name`
- `tagline`
- `contact_email`

## Directus member authentication and registration setup

To support `/create-account` and `/member-login`:

1. Create a member role in Directus named `Curler`.
2. Enable public registration in Directus so frontend registration can call `/users/register`.
3. Configure Directus so new public registrations are assigned to `Curler` (recommended).
4. In frontend `.env`, optionally set:
  - `VITE_DIRECTUS_ENFORCE_MEMBER_ROLE=true`
  - `VITE_DIRECTUS_MEMBER_ROLE_ALLOWLIST=Curler,<curler-role-uuid>`

The account page submits to Directus `/users/register` using `email`, `password`, `first_name`, and `last_name`. Directus assigns the role from its registration settings. The login view authenticates against `/auth/login`, loads `/users/me`, and stores the auth session in browser local storage.

If Directus returns the role as an ID during login checks, include that UUID in `VITE_DIRECTUS_MEMBER_ROLE_ALLOWLIST`.
If your instance is policy-first and role is empty, include the policy name/UUID in `VITE_DIRECTUS_MEMBER_ROLE_ALLOWLIST`.

## Project structure

```text
.
├─ src/
│  ├─ api/
│  │  ├─ auth.ts
│  │  ├─ announcements.ts
│  │  ├─ directus.ts
│  │  ├─ leagues.ts
│  │  └─ siteSettings.ts
│  ├─ assets/
│  │  └─ main.css
│  ├─ components/
│  │  ├─ AnnouncementCard.vue
│  │  ├─ AppFooter.vue
│  │  ├─ AppHeader.vue
│  │  └─ LeagueCard.vue
│  ├─ config/
│  │  └─ constants.ts
│  ├─ router/
│  │  └─ index.ts
│  ├─ stores/
│  │  └─ app.ts
│  ├─ types/
│  │  ├─ announcement.ts
│  │  ├─ auth.ts
│  │  ├─ index.ts
│  │  ├─ league.ts
│  │  └─ siteSettings.ts
│  ├─ views/
│  │  ├─ CreateAccountView.vue
│  │  ├─ HomeView.vue
│  │  ├─ LeaguesView.vue
│  │  └─ MemberLoginView.vue
│  ├─ App.vue
│  └─ main.ts
├─ .env.directus.example
├─ .env.example
├─ docker-compose.yml
├─ index.html
├─ package.json
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts
```

## Notes

 - This project intentionally does **not** use Nuxt, SSR, backend APIs, or payments.
- Member login now uses Directus authentication. Production hardening (MFA, stricter policies, refresh rotation strategy) can be added later.
- This is a clean proof-of-concept foundation that can be expanded later for registration, member accounts, rentals, and richer content workflows.

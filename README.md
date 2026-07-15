# TravelAI

## Run locally

Open two terminals in this project folder.

```powershell
npm run backend
```

The API starts at `http://localhost:5000`.

```powershell
npm run frontend
```

Open the URL printed by Vite, normally `http://localhost:5173`.

The frontend requires the Supabase values in `frontend/.env`, which are already included locally. Create an account from `/register` before opening dashboard pages, because they are protected routes.

## Supabase setup

Before creating groups, run `backend/config/GroupTables.sql` in the Supabase SQL Editor. This creates the missing tables and row-level-security policies that allow users to create and view only their own groups.

## Deploy

Deploy `frontend` as a Vite site on Vercel. Set `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and `VITE_API_URL` in the host environment variables. The included `frontend/vercel.json` prevents direct dashboard URLs from returning 404.

Deploy `backend` to Render using `render.yaml`, then set the deployed API URL as `VITE_API_URL` in the frontend host and redeploy the frontend.

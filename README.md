# Repair App (Fullstack)
This is a ready-to-run fullstack Repair Management application (backend: Node.js/Express + MongoDB, frontend: React + Vite).

## What's included
- backend/ : Express API (JWT auth, requests CRUD, file upload)
- frontend/ : React + Vite SPA (register, login, create request, list requests)
- docker-compose.yml : run everything with Docker
- .env.example in backend

## Quick local run (without Docker)
1. Backend
   - cd backend
   - cp .env.example .env and edit values (set JWT_SECRET)
   - npm install
   - npm run dev
   - API: http://localhost:8000

2. Frontend
   - cd frontend
   - npm install
   - npm run dev
   - Open the Vite URL (default: http://localhost:5173) or via docker mapping http://localhost:3000 if using compose

## Run with Docker Compose (recommended)
From project root:
```
docker compose up --build
```
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## Notes & next steps
- Change JWT_SECRET to a secure random value before production.
- Configure CORS origins for production.
- Add validation & rate-limiting if exposing API publicly.
- If you want, I can:
  - add email notifications, admin panel, or role management UI
  - push this repo to GitHub for you
  - provide a production-ready deployment guide (DigitalOcean / Render / Railway)

# Nox

A social platform for music fans — connect your Last.fm account, browse and post in artist/genre communities, and generate visual "album quilts" from your real listening data.

## Features

- **Auth** — JWT-based registration and login
- **Communities** — Reddit-style tags for artists and genres, with threaded discussions
- **Last.fm integration** — connect your account to pull real listening stats
- **Album quilts** — auto-generated grid collages of your top albums or top tracks, with custom time period and grid size
- **Top artists / top albums** — see your real listening history inside the app

## Tech stack

**Backend:** FastAPI, PostgreSQL, SQLModel, Alembic, Pillow (image generation)
**Frontend:** React (Vite), React Router
**Auth:** JWT, bcrypt password hashing
**External API:** Last.fm

## Screenshots

*(add a few screenshots here once you have them — this section genuinely helps a lot for portfolio purposes)*

## Getting started

### Backend

```bash
cd backend
python -m venv venv
source venv/Scripts/activate   # Windows (Git Bash) — use venv/bin/activate on Mac/Linux
pip install -r requirements.txt

cp .env.example .env
# then fill in .env with your own database URL, secret key, and Last.fm API credentials
# get Last.fm API keys at https://www.last.fm/api/account/create

alembic upgrade head
uvicorn app.main:app --reload
```

Backend runs at `http://127.0.0.1:8000` — interactive API docs at `http://127.0.0.1:8000/docs`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

### Database

Requires PostgreSQL running locally. Easiest via Docker:

```bash
docker run --name music-app-db -e POSTGRES_PASSWORD=yourpassword -e POSTGRES_DB=musicapp -p 5432:5432 -d postgres
```

## Roadmap

- [ ] Spotify integration (pending developer account access)
- [ ] Auto-generate quilts on a schedule
- [ ] Top artists as a visual grid (blocked on Last.fm's API not returning artist images)

## License

MIT
